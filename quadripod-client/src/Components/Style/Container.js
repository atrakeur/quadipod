import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const Container = style("div")({
	width: "100%",
	border: "1px solid #dedede",
	borderRadius: "4px",
	boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.055)",
	margin: "0",
	padding: "0",

	"> div": {
		margin: "10px",
	}
})

export default Container