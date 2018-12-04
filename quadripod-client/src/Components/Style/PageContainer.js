import { h } from "preact"
import picostyle from "picostyle"
const style = picostyle(h)

const PageContainer = style("div")({
  maxWidth: "800px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "@media (max-width: 900px)": {
    maxWidth: "500px",
  },
})

export default PageContainer