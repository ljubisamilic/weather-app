import React from 'react';
import {
  FaArrowUp,
  FaArrowDown,
  FaTemperatureHigh,
  FaTint,
  FaWind,
} from 'react-icons/fa';
import Icons from './Icons';

const Forecast = ({ weather }) => {
  const {
    dt,
    feels_like,
    humidity,
    temp,
    temp_max,
    temp_min,
    name,
    country,
    timezone,
    description,
    icon,
    wind_speed,
  } = weather;
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60;
  d.setSeconds(d.getSeconds() + offset + timezone);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className='forecast'>
      <div className='forecast-date'>
        <span>
          {days[d.getDay()]}, {d.getDate()} {months[d.getMonth()]}{' '}
          {d.getFullYear()}
        </span>{' '}
        <span className='space'></span>{' '}
        <span>
          Local time: {d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:
          {d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}
        </span>
        <h2 className='location'>
          {name}, {country}
        </h2>
      </div>
      <div className='forecast-details'>
        <div className='current-icon'>
          <Icons code={icon} size={70} />
        </div>
        <div className='curret-weather-details'>
          <h4 style={{ color: '#61d9fb' }}>{description}</h4>
          <h1 className='temperature'>
            {Math.round(temp)}
            <span>°C</span>
          </h1>
          <p className='max-min-temperatures'>
            <FaArrowUp /> Hight: <strong>{Math.round(temp_max)}°</strong>{' '}
            <span className='space'></span> <FaArrowDown /> Low:{' '}
            <strong>{Math.round(temp_min)}°</strong>
          </p>
        </div>
        <ul className='more-details'>
          <li>
            <FaTemperatureHigh /> <span>Real feel:</span>{' '}
            <strong>{Math.round(feels_like)}°</strong>
          </li>
          <li>
            <FaTint />
            <span>Humidity:</span>
            <strong> {humidity}%</strong>
          </li>
          <li>
            <FaWind /> <span>Wind:</span> <strong>{wind_speed}km/h</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Forecast;
