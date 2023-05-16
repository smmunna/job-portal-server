const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./database/db')
const port = process.env.PORT || 5000
const jobsRouter = require('./routes/jobsRouter')

app.use(cors())
app.use(express.json())

// Routes;
app.use('/jobs',jobsRouter)

app.get('/' , (req , res)=>{
   res.send('Job Portal Server is running successfully.')
})
app.get('*' , (req , res)=>{
   res.send({
    message:"No Routes Found !"
   })
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))