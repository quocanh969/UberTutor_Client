import React from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookLoginComponent from './Login/Components/FacebookLoginComponent';
import GoogleLoginComponent from './Login/Components/GoogleLoginComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FacebookLoginComponent />
      <GoogleLoginComponent />
    </div>
  );
}

export default App;
