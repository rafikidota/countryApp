import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `button{
      margin-right: 5px;
    }
    `
  ]
})
export class ByRegionComponent implements OnInit {

  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  error: boolean = false;
  query: string = '';
  countries: Country[] = [];



  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }
  selectRegion(region: string) {
    if (region === this.query) { return; }
    this.query = region;
    this.countries = [];
    this.countryService.findCountryByRegion(this.query)
      .subscribe(countries => {
        this.countries = countries
        console.log(this.countries);
      });
  }
  getCSS(region: string): string {
    return (region === this.query)
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
}

