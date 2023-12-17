import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Clock from './Clock';
import UserDetails from './UserDetails';
import PostList from './PostList';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [clock, setClock] = useState(new Date());
  const [clockRunning, setClockRunning] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('UTC');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(userResponse.data);

        const countriesResponse = await axios.get('http://worldtimeapi.org/api/timezone');
        setCountries(countriesResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      if (clockRunning) {
        setClock(new Date());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [id, clockRunning]);

  const toggleClock = () => setClockRunning(!clockRunning);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='top-div'>
        <button className='button'><Link to="/">Back</Link></button>
        <Clock
          clock={clock}
          running={clockRunning}
          toggleClock={toggleClock}
          countries={countries}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
        />
      </div>
      <p className='profile-p'>{user.name}'s Profile</p>
      <UserDetails user={user} />
      <PostList userId={user.id} />
    </div>
  );
};

export default UserProfile;
