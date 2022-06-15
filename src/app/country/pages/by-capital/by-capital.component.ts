import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html'

})
export class ByCapitalComponent implements OnInit {
  query: string = ''
  error: boolean = false;
  countries: Country[] = [];
  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
  }
  search(query: string) {
    this.error = false;
    this.query = query;
    this.countryService.findCountryByCapital(query)
      .subscribe(countries => {
        this.countries = countries;        
      }, err => {
        this.error = true;
        this.countries = [];
      });
  }
  suggestions(query: string) {
    this.error = false;
    //TODO:  Crear suggestions
  }



}
