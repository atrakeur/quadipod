import React, { Component } from 'react'
import { textStyles } from './Typo'
import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const Button = style("button")({
	...textStyles,

	color: "rgba(0, 0, 0, 0.87)",
	padding: "8px 16px",
	minWidth: "64px",
	minHeight: "36px",
	lineHeight: "1.5",
	borderRadius: "4px",
	textTransform: "uppercase",

	transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
})

export default Button