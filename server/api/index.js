import express from 'express'
import UserRoute from '../Routes/Data.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT

mongoose.connect(process.env.DATABASE_CON).then(()=>{
    console.log("MongoDB connected")
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/Notes",UserRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})