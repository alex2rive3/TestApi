const express = require("express")
const cookieParser = require('cookie-parser');
const cors = require("cors")
require("dotenv").config()

const { swaggerDoc } = require("./swagger")
const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.LOCALHOST
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Posts route addresses
app.use("/api/posts", require("./routes/posts.routes"));



//Listen To Port
const port = process.env.PORT
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`)
  swaggerDoc(app, port)
})