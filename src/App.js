import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class App extends Component {

async componentDidMount() {
  const login = await axios.post('http://localhost:3001/users/login', {
    email: 'tuliofaria@devpleno.com',
    passwd: 'abc123'
  });

  const token = login.data.token;
  const decoded = jwtDecode(token);
  console.log(decoded);

}

  render() {
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
      </div>
    );
  }
}

export default App;
