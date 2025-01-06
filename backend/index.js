const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const connectDB =  require('./db/db')
const indexRoute = require('./routes/indexRoutes')
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express()

connectDB()

app.use(
    cors({
      origin: "https://www.belleza.pk",
      credentials: true 
    })
  );

app.get("/", (req , res)=>{
    res.send("Hello!! The backend is running.....🎉🎉")
})

app.use(bodyParser.json())

app.use(express.json())

// Error Handling Middleware
app.use(errorHandler);

app.use('/', indexRoute);  // main route

const PORT  = process.env.PORT || 3200
app.listen(PORT , () => console.log(`Server running on port: ${PORT}`))