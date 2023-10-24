import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'e1ecd9d2f9msh06788a08cbe67d3p17a994jsn1c43a9912c7d';
  private apiUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather';

  constructor(private http: HttpClient) { }

  options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com',
			'x-rapidapi-key': 'e1ecd9d2f9msh06788a08cbe67d3p17a994jsn1c43a9912c7d'
    }
  };
  
  revGeocoding = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
			'x-rapidapi-key': 'e1ecd9d2f9msh06788a08cbe67d3p17a994jsn1c43a9912c7d'
    }
  };

  getWeather(city: string) {
    let url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city
    const params = {
      q: city,
      appid: this.apiKey,
      //units: 'metric' // You can change this to 'imperial' for Fahrenheit
    };
    return this.http.get(url, this.options);
  }

  getWeatherByCoords(lat: number, lon: number) {
    let url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat='+lat+'&lon='+lon
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
      appid: this.apiKey,
      units: 'metric'
    };
    return this.http.get(url, this.options);
  }

  getCityNameByCoords(lat: number, lon: number): Observable<any>{
    let url = 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat='+lat+'&lon='+lon
    debugger
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
    };
    return this.http.get(url, this.revGeocoding);
  }
  
}

