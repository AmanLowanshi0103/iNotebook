// const mongoose = require('mongoose');
const express = require('express')
const connectToMon=require("./db")
const app = express()
var cors = require('cors')
// connectToMon();
const port = 5000
app.use(express.json())

app.use(cors())

app.use("/api/user",require("./Routes/user.js"))
app.use("/api/notes",require("./Routes/notes.js"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})