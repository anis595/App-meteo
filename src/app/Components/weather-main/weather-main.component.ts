import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.css'],
})
export class WeatherMainComponent implements OnInit {
  WeatherData: any;
  constructor() {}
  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true,
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  getWeatherData() {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=Lille,fr&APPID=b97064688b9fd10fd57ce57df65e1add'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
  }
  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (
      this.WeatherData.main.temp - 273.15
    ).toFixed(0);
    this.WeatherData.temp_min = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_max = (
      this.WeatherData.main.temp_max - 273.15
    ).toFixed(0);
    this.WeatherData.temp_feels_like = (
      this.WeatherData.main.feels_like - 273.15
    ).toFixed(0);
  }
}
