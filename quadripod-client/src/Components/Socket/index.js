import React, { Component } from 'react'

import EventEmitter from '../../helpers/EventEmitter' 

export const SocketEventEmitter = new EventEmitter()

class Socket extends Component {

  componentDidMount() {
    this.socket = new WebSocket(`ws://192.168.1.76`)
    this.socket.onmessage = function (event) {
      const reader = new FileReader()

      reader.addEventListener('loadend', (e) => {
        const dataAsText = e.srcElement.result.trim()
        const data = dataAsText.split(':')

        console.log("Received", data)
        SocketEventEmitter.emit(data[0], data[1])
      })

      reader.readAsText(event.data)
    }

    SocketEventEmitter.on('send', data => {
      console.log("Sent", data)
      this.socket.send(data)
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const { children } = this.props
    return (<div>
      { children }
    </div>)
  }
}

export default Socket;
