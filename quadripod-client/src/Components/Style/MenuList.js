import React, { Component } from 'react'
import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const MenuList = style("ul")({
  margin: "5px",
  padding: "0",
})

export default MenuList