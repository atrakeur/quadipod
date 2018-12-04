import React, { Component } from 'react'

import { map, take } from 'lodash'

import { SocketEventEmitter } from '../SocketProvider'

const STORAGE_NAME = 'savedBuffer'
const MESSAGE_STATUS_SENT = '>'
const MESSAGE_STATUS_RECV = '<'
const MESSAGE_STATUS = [MESSAGE_STATUS_SENT, MESSAGE_STATUS_RECV]

class SocketBuffer extends Component {

  state = {
    buffer: []
  }

  componentDidMount() {
    if (sessionStorage && sessionStorage.getItem(STORAGE_NAME)) {
      try {
        const data = JSON.parse(sessionStorage.getItem(STORAGE_NAME))
        this.setState(prevState => ({
          buffer: JSON.parse(sessionStorage.getItem(STORAGE_NAME))
        }))
      } catch (e) {
        console.warn('Error while reading console json', e)
      }
    }
    
    SocketEventEmitter.on('receive', this.handleReceive)
    SocketEventEmitter.on('sent', this.handleSent)
  }

  componentWillUnmount() {
    SocketEventEmitter.removeListener('receive', this.handleReceive)
    SocketEventEmitter.removeListener('sent', this.handleSent)

    if (sessionStorage) {
      sessionStorage.setItem(STORAGE_NAME, JSON.stringify(this.state.buffer))
    }
  }

  getChildContext() {
    return {
      socketBuffer: this.state.buffer,
    }
  }

  handleReceive = (data) => this.setState(prevState => ({
    buffer: [`${MESSAGE_STATUS_RECV} ${data}`, ...take(prevState.buffer, 150)]
  }))

  handleSent = (data) => this.setState(prevState => ({
    buffer: [`${MESSAGE_STATUS_SENT} ${data}`, ...take(prevState.buffer, 150)]
  }))

  render() {
    return this.props.children
  }
}

export default SocketBuffer
