import React from 'react';
import Icons from './Icons';

const ForecastDays = ({ dailyWeather }) => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return (
    <div className='forecast-days'>
      <h3>Next 7 days</h3>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {dailyWeather.map((daily) => {
          const d = new Date(daily.dt * 1000);

          return (
            <div className='forecast-day' key={daily.dt}>
              <div className='day'>{days[d.getDay()]}</div>
              <Icons code={daily.weather[0].icon} size={40} />
              <div className='forecast-temeperature'>
                <span className='max-temeperature'>
                  {Math.round(daily.temp.max)}°
                </span>
                <span className='min-temperature'>
                  {Math.round(daily.temp.min)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDays;
