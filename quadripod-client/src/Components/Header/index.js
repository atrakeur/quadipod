import React, { Component } from 'react'

import { MenuBar, MenuList, MenuItem, Link } from '../Style'

class Header extends Component {

  render() {
    return (<MenuBar>
      <MenuList>
        <MenuItem>
          <Link href="/">Control</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/map">Map</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/console">Console</Link>
        </MenuItem>
      </MenuList>
    </MenuBar>)
  }
}
export default Header
