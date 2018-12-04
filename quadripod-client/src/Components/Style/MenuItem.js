import React, { Component } from 'react'
import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const MenuItem = style('li')({
  display: "inline-block",
  listStyleType: "none",
  transition: "all 0.2s",
  padding: "5px",
})
export default MenuItem