import React, { Component } from 'react'
import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const MenuBar = style("nav")({
  backgroundColor: "#fff",
  border: "1px solid #dedede",
  borderRadius: "4px",
  boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.055)",
  color: "#888",
  display: "block",
  margin: "8px 0px 8px 0px",
  overflow: "hidden",
  width: "100%",
  padding: "0",
})
export default MenuBar
