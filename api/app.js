require('dotenv').config();
require('express-async-errors');

//express setup
const express = require('express');
const app = express();

//security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit');

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({
  windowMs: 60 * 1000,
  max: 60
}))

//connect database
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

//routes
const authRouter = require('./routes/auth')
const scheduleRouter = require('./routes/schedule')
const userRouter = require('./routes/user')

app.get('/', (req, res) => {
  res.send('schedule api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/schedule', authenticateUser, scheduleRouter)
app.use('/api/v1/profile', authenticateUser, userRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

//app listening setup
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => 
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();