import React, { Component } from 'react'

import EventEmitter from '../../helpers/EventEmitter' 

export const SocketEventEmitter = new EventEmitter()

class SocketProvider extends Component {

  componentDidMount() {
    this.socket = new WebSocket(`ws://192.168.1.77`)
    this.socket.onmessage = function (event) {
      const reader = new FileReader()

      reader.addEventListener('loadend', (e) => {
        const dataAsText = e.srcElement.result.trim()
        const data = dataAsText.split(':')

        SocketEventEmitter.emit(data[0], data[1])
        SocketEventEmitter.emit("receive", dataAsText)
      })

      reader.readAsText(event.data)
    }

    SocketEventEmitter.on('send', data => {
      try {
        this.socket.send(data)
        SocketEventEmitter.emit("sent", data)
      } catch (e) {
        SocketEventEmitter.emit("receive", 'SOCKET:DISCONNECT')
        SocketEventEmitter.emit("error", e)
      }
    })

    this.healthCheck = setInterval(this.sendPing, 15000, 15000)
  }

  componentWillUnmount() {
    this.socket.close()
    clearInterval(this.healthCheck)
  }

  sendPing = () => {
    SocketEventEmitter.emit('send', "WEBSOCK:PING")
  }

  render() {
    const { children } = this.props
    return (<div>
      { children }
    </div>)
  }
}

export default SocketProvider
