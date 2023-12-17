// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDirectory from './Components/UserDirectory';
import UserProfile from './Components/UserProfile';
import './App.css';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<UserDirectory />} />
      <Route path="/user/:id" element={<UserProfile />} />
    </Routes>
  </Router>
  );
};

export default App;
