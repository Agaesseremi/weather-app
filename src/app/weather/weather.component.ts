import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  public weatherData: any[] = [];
  public city: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeather('Lyon');
    this.getWeatherIcon()
  }

  onSubmit() {
    this.getWeather(this.city);
  }

  getWeather(city: string) {
    const url = `${this.apiUrl}/weather?q=${city}&units=metric&appid=a8a7853600507e1343a0afa21d46b877`;
    this.http.get(url).subscribe((data: any) => {
      this.weatherData = [data];
      console.log(this.weatherData);
    });
  }
  getWeatherIcon(): string {
    if (this.weatherData.length > 0) {
      const weather = this.weatherData[0].weather[0].main.toLowerCase();

      switch (weather) {
        case 'clouds':
          return 'cloudy';
        case 'clear':
          return 'sun';
        case 'rain':
          return 'rainy';
        case 'snow':
          return 'snowy';
        case 'thunderstorm':
          return 'storm';
        case 'wind':
          return 'windy';
        default:
          return '';
      }
    }

    return '';
  }


}