require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express()

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(express.static('./public'))
app.use(cors())

// router
const authRouter = require('./routes/authRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');

//connect db
const { testDbConnection } = require('./db/connect');


app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('badinh-be')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await testDbConnection();
    app.listen(port, console.log(`Server listening port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

start()