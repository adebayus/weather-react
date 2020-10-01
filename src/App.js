import { useState } from "react";
import React from 'react';

const api = {
  key :"0b5e0cbceba8382df1ad9234da742ceb",
  base :"http://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [ query, setQuery] = useState('')
   
  const [weather, setWeather] = useState({})
  const search = evt => {
    if (evt.key === "Enter"){
     fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
      // fetch(`https://reqres.in/api/users?page=1`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        // setQuery('');
        // console.log(result); 
        // console.error(result); 
      
      });
    }
  }
    
  const dateBuilder = (d) => {
    
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days = ["Sunday","Monday","Tuesday","sunday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[d.getDay()];
    let date = d.getDay();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp-273 > 16 )? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" 
          className="search-bar"
          placeholder="search"
          onChange={ e => setQuery(e.target.value)}
          value={query} 
          onKeyPress= {search}
          />
        </div>
        {(typeof weather.main != "undefined" ) ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)-273}&deg;C</div>
               <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>    
  );
}

export default App;
