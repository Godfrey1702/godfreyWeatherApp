import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import drizzling_icon from '../assets/drizzling.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'
import { useRef } from 'react'



const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false)

  const allIcons ={
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzling_icon,	
    "04n": drizzling_icon,
    "09d": rain_icon, 	
    "09n": rain_icon,
    "10d": rain_icon, 	
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async (city)=>{
    if(city === ""){
      alert=("Please Enter Country Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return
      }

       console.log(data)
      const icon = allIcons[data.weather[0]?.icon] || clear_icon;

      
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })


    } catch (error) {
      weatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  useEffect(()=>{
    search("togo")
  },[])

  return (
    <div className='weather'>
      <h1 className='owner' >Godfrey Weather App Project</h1>
     <div className='search-bar'>
      <input ref = {inputRef} type="text" placeholder= 'search'/>
     <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
     </div>

      {weatherData?<>
      
      <img src={weatherData.icon} alt="" className='weather_icon'/>

    <p className='temp'>{weatherData.temperature}ºC</p>
     <p className='location'>{weatherData.location}</p>

     <div className="weather_data">
      <div className="col">
        <img src={humidity_icon} alt="" />
        <div>
          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
        </div>

        <div className="col">
        <img src={wind_icon} alt="" />
        <div>
          <p>{weatherData.wind} km/h</p>
          <span>Wind</span>
        </div>
        </div>

        

     </div>
      
      </>:<></>}

     
     </div>
  )
}

export default Weather