import React, { Component } from 'react';

import EventEmitter from '../../helpers/EventEmitter' 

export const SocketEventEmitter = new EventEmitter()

class Socket extends Component {

  componentDidMount() {
    this.socket = new WebSocket(`ws://192.168.1.76`);
    this.socket.onmessage = function (event) {
      console.log(event)

      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        const dataAsText = e.srcElement.result.trim();
        const data = dataAsText.split(':')
        SocketEventEmitter.emit(data[0], data[1])

        console.log(data)
      });
      reader.readAsText(event.data);
    }
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const { children } = this.props
    return (<React.Fragment>
      { children }
    </React.Fragment>)
  }
}

export default Socket;
