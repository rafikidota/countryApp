import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class ByCountryComponent {
  query: string = '';
  error: boolean = false;
  showSuggestion: boolean = false;
  countries: Country[] = [];
  suggestionedCountries: Country[] = [];

  constructor(private countryService: CountryService) { }

  search(query: string) {
    this.showSuggestion = false;
    this.suggestionedCountries = [];
    this.error = false;
    this.query = query;
    this.countryService.findCountryByName(query)
      .subscribe(countries => {
        this.countries = countries;
      }, err => {
        this.error = true;
        this.countries = [];
      });
  }
  suggestions(query: string) {
    this.error = false;
    this.query = query;
    if (query.length>0) {
      this.showSuggestion = true;
      this.countryService.findCountryByName(query)
      .subscribe(countries => {
        this.suggestionedCountries = countries.splice(0, 5);
      }, (err) => {
        console.log(err);
        this.suggestionedCountries = [];
      });
    }else{
      this.showSuggestion = false;
    }
    
  }
  searchQuery(query: string) {
    this.search(query);
  }
}
