import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,flags,cca2,population');
  }

  constructor(private http: HttpClient) { }

  findCountryByName(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
  findCountryByCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
  findCountryByAlphaCode(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${query}`;
    return this.http.get<Country[]>(url);
  }
  findCountryByRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  orderBy(countries: Country[]) {

    let countriesNames:string[] = [];
    
    countries.forEach(country => {
      countriesNames.push(country.name.common);
    });
    function SortArray(x: string, y: string) {
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    }
    countriesNames = countriesNames.sort(SortArray);
    console.log(countriesNames);
    
    return countriesNames;
  }
}
