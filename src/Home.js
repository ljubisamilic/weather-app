import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Forecast from './components/Forecast';
import ForecastDays from './components/ForecastDays';
import Loading from './components/Loading';

const API_KEY = '652b5dc4d7dc6cf99e2a92482511337f';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [cityInfo, setCityInfo] = useState('');
  const [city, setCity] = useState(localStorage.getItem('city') || 'Derventa');
  const [weather, setWeather] = useState('');
  const [dailyWeather, setDailyWeather] = useState([]);
  const getCity = async (e) => {
    e.preventDefault();
    if (city.trim) {
      setLoading(true);
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.length) {
        const info = { lat: data[0].lat, lon: data[0].lon };
        localStorage.setItem('city', city);
        setCityInfo(info);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const getCityOnce = async () => {
      setLoading(true);
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.length) {
        const info = { lat: data[0].lat, lon: data[0].lon };
        setCityInfo(info);
      }
      setLoading(false);
    };
    getCityOnce();
  }, []);
  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data) {
        const info = {
          dt: data.coord.dt,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          name: data.name,
          country: data.sys.country,
          timezone: data.timezone,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          wind_speed: data.wind.speed,
        };
        setWeather(info);
      }
      setLoading(false);
    };
    if (cityInfo) {
      getWeather();
    }
  }, [cityInfo]);
  useEffect(() => {
    const getDailyWeather = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&exclude=hourly,current,minutely,alerts&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data) {
        setDailyWeather(data.daily);
      }
      setLoading(false);
    };
    if (cityInfo) {
      getDailyWeather();
    }
  }, [cityInfo]);
  if (loading) {
    return (
      <div className='container'>
        <Loading />
      </div>
    );
  }
  return (
    <div className='container'>
      <Search city={city} setCity={setCity} getCity={getCity} />
      {weather ? (
        <>
          <Forecast weather={weather} />
          <ForecastDays dailyWeather={dailyWeather} />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
