import { Component, OnInit, } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city: string = '';
  weatherData: any;
  temperatureClass: string ='';
  cityName: string = '';
  showWeatherBox: boolean = false;
  extractCity: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    //this.useMyLocation();
  }

  options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com',
			'x-rapidapi-key': 'e1ecd9d2f9msh06788a08cbe67d3p17a994jsn1c43a9912c7d'
    }
  };


  getWeather() {
    if(this.city){
    this.weatherService.getWeather(this.city)
      .subscribe(data => {
        this.weatherData = data;
        this.setTemperatureClass(this.weatherData.temp);
        this.cityName = this.city;
        this.showWeatherBox = true;
        //console.log(data);
      });
  }
}
  setTemperatureClass(temp: number) {
    if (temp <= 10) {
      this.temperatureClass = 'weather-cold';
    } else if (temp > 10 && temp <= 25) {
      this.temperatureClass = 'weather-moderate';
    } else {
      this.temperatureClass = 'weather-warm';
    }
  }


  useMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherByCoords(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.weatherData = data;
         // console.log(this.weatherData)
          this.showWeatherBox = true;
          this.setTemperatureClass(this.weatherData.main.temp);
          this.getCityName(position.coords.latitude, position.coords.longitude)
        });
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
    //this.showWeatherBox = true;
  }

  goBack() {
    this.city = '';
    this.showWeatherBox = false; // Hide the weather box and return to the input box
  }

  getBackgroundImage() {
    if (this.weatherData) {
      const temp = this.weatherData.temp;
      if (temp <= 10) {
        return `url('https://4kwallpapers.com/images/wallpapers/glacier-mountains-snow-covered-dark-sky-green-trees-1600x900-3930.jpg')`;
      } else if (temp > 10 && temp <= 25) {
        return `url('https://static1.bigstockphoto.com/2/7/1/large1500/172562840.jpg')`;
      } else {
        return `url('https://th-thumbnailer.cdn-si-edu.com/uoTi3gl1Bw3fFeQ_rFcp6kU5rwo=/fit-in/1600x0/https%3A%2F%2Ftf-cmsv2-smithsonianmag-media.s3.amazonaws.com%2Ffiler%2Ff2%2F94%2Ff294516b-db3d-4f7b-9a60-ca3cd5f3d9b2%2Ffbby1h_1.jpg')`;
      }
    }
    return `url('default-background-image.jpg')`; // Default image when weather data is not available
  }

  getCityName(latitude: number, longitude: number){
    this.weatherService.getCityNameByCoords(latitude, longitude)  
    .subscribe(myCity => {
      if(myCity.results.length > 0){
        this.cityName = myCity.results[0].components.city;
        console.log(this.cityName);
      }
        });
  }
}
