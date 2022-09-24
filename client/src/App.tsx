import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainCalendar from './components/Calendar';

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400">
      <div className="App">
        <Navbar />
        <MainCalendar />
      </div>
    </div>
  );
}

export default App;
