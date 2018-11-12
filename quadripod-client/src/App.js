import React, { Component } from 'react';
import Socket, { SocketEventEmitter } from './Components/Socket'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    SocketEventEmitter.on('tamere', (data) => console.log(data))

    return (
      <Socket>
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
      </Socket>
    );
  }
}

export default App;
