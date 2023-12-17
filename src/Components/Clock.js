import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Clock = ({ running, toggleClock, countries, selectedCountry, handleCountryChange }) => {
  const [clock, setClock] = useState(null);
  const pausedTimeRef = useRef(null);
  const pausedDurationRef = useRef(0);

  const fetchCurrentTime = async (country) => {
    try {
      const response = await axios.get(`http://worldtimeapi.org/api/timezone/${country}`);
      return response.data.utc_datetime;
    } catch (error) {
      console.error(`Error fetching current time for ${country}:`, error);
      return null;
    }
  };

  const updateClock = async () => {
    if (running) {
      let adjustedTime;
  
      if (pausedTimeRef.current !== null) {
        const pausedDuration = Date.now() - pausedTimeRef.current;
        adjustedTime = new Date(pausedTimeRef.current).getTime() + pausedDuration;
      } else {
        const currentTime = await fetchCurrentTime(selectedCountry);
        if (currentTime) {
          adjustedTime = new Date(currentTime).getTime();
        }
      }
  
      const formattedTime = new Date(adjustedTime).toLocaleTimeString(undefined, {
        timeZone: selectedCountry,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
  
      setClock(formattedTime);
    }
  };
  

  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, [selectedCountry, running]);

  const togglePause = async () => {
    if (running) {
      if (pausedTimeRef.current === null) {
        pausedTimeRef.current = Date.now();
      }
      toggleClock();
    } else {
      if (pausedTimeRef.current !== null) {
        pausedTimeRef.current = null;
      }
      toggleClock();
    }
  };
  

  useEffect(() => {
    console.log('Selected Country Updated:', selectedCountry);
    updateClock();
  }, [selectedCountry]);

  return (
    <div className="clock">
      <div className='country'>
        <select
          id="countrySelector"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="clock-container">
        {clock && <p>{clock}</p>}
        <button id='btn' className='button-1' onClick={togglePause}>{ 'Pause/Start'}</button>
      </div>
    </div>
  );
};

export default Clock;
