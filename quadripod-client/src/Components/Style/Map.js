import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const MapContainer = style("table")(props => ({
	border: "1px solid #dedede",
	borderRadius: "4px",
	boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.055)",
	margin: "0",
	padding: "0",

	borderCollapse: 'collapse',
	borderSpacing: '0',
}))


const MapCellUnknown = style("td")({
	backgroundColor: 'transparent',
	width: "5px",
	height: "5px",
})

const MapCellFree = style("td")({
	backgroundColor: 'grey',
	width: "5px",
	height: "5px",
})

const MapCellBlocked = style("td")({
	backgroundColor: 'black',
	width: "5px",
	height: "5px",
})

export {
	MapContainer,
	MapCellUnknown,
	MapCellFree,
	MapCellBlocked,
}