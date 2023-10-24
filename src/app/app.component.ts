import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private http: HttpClient) {}
  title = 'weather-app';

//   ngOnInit() {
// 		// API Call
// 		let headers = new HttpHeaders({
// 			'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com',
// 			'x-rapidapi-key': 'e1ecd9d2f9msh06788a08cbe67d3p17a994jsn1c43a9912c7d'
// 		});
// 		this.http
// 			.get<any>('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather', {
// 				headers: headers
// 			})
// 			.subscribe(data => {
// 				console.log(data);
// 			});
// 	}
}
