import React, { Component } from 'react'
import Router from 'preact-router'

import Header from './components/Header'

import { PageContainer, Container } from './components/Style'

import SocketProvider from './components/SocketProvider'
import SocketBuffer from './components/SocketBuffer'
import SocketConsole from './pages/SocketConsole'
import ControlPage from './pages/ControlPage'
import MapPage from './pages/MapPage'

class App extends Component {
  render() {
    return (<SocketProvider>
      <SocketBuffer>
        <PageContainer>
          <Header />
          <Container>
            <Router>
              <div path="/">
                <ControlPage />
              </div>
              <div path="/map">
                <MapPage />
              </div>
              <div path="/console">
                <SocketConsole />
              </div>
            </Router>
          </Container>
        </PageContainer>
      </SocketBuffer>
    </SocketProvider>)
  }
}

export default App;
