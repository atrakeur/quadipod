import React, { Component } from 'react'

import { Button } from '../../components/Style'

import { SocketEventEmitter } from '../../components/SocketProvider'

class ControlPage extends Component {

  componentWillMount() {
    SocketEventEmitter.on('xyz', this.handleReceive)
  }

  componentWillUnmount() {
    SocketEventEmitter.removeListener('xyz', this.handleReceive)
  }

  handleReceive = (data) => {
  }


  render() {
    return (<div>
      <Button>Forward</Button>
      <Button>Backward</Button>
    </div>)
  }
}
export default ControlPage
