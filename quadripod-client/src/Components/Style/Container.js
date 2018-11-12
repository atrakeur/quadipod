import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const Container = style("div")({
  width: "500px",
  margin: "0 auto"
})

export default Container