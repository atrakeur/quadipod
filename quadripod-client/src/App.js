import React, { Component } from 'react';

import Router from 'preact-router'

import { Container } from './components/Style'
import Socket, { SocketEventEmitter } from './components/Socket'

console.log(Container)

class App extends Component {
  render() {
    return (
      <Socket>
        <Container>
          <Router>
            <div path="/">Lala</div>
            <div path="/test">Lol</div>
          </Router>
        </Container>
      </Socket>
    );
  }
}

export default App;
