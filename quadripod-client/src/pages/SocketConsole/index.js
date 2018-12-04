import React, { Component } from 'react'

import { map } from 'lodash'

class SocketConsole extends Component {

  render() {
    const { socketBuffer } = this.context

    return (<div>
      { map(socketBuffer, e => (<p>{e}</p>)) }
    </div>)
  }
}

export default SocketConsole
