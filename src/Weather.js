import React, { useState} from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [apiKey] = useState('ccf5109e04a1727bc94e962ebc893242'); // Replace with your API key
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    // setUpdated(city);
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
    
            if (!response.ok) {
              throw new Error('Weather data not available');
            }
    
            const data = await response.json();
            setWeatherData(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (city !== '') {
          fetchData();
        }
  };
  

  return (
    <div className='box-border h-50 w-50 p-4 border-4 text-center justify-center items-center'>
      <div>
        <h1 className='text-2xl underline'>Weather App</h1>
      </div>
      <div className='mt-10'>
        <input
          type="text"
          placeholder="Enter city name"
          id="city"
          name="city"
          onChange={handleChange}
          value={city}
        />
      </div>
      <div>
        <button className='text-xl bg-black rounded-md text-stone-50' onClick={handleClick}>Search</button>
      </div>
      
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;