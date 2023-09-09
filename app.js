require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
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
const userRouter = require('./routes/userRoutes')
const tournamentRouter = require('./routes/tournamentRoutes')
const teamRouter = require('./routes/teamRoutes')
const playerRouter = require('./routes/playerRoutes')
const gameRouter = require('./routes/gameRoutes')
const statsRouter = require('./routes/statsRoutes')
const standingRouter = require('./routes/standingRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');

//connect db
const { testDbConnection } = require('./db/connect');
const migrations = require('./helpers/migrations');


app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('badinh-be')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/tournament', tournamentRouter)
app.use('/api/v1/team', teamRouter)
app.use('/api/v1/player', playerRouter)
app.use('/api/v1/game', gameRouter)
app.use('/api/v1/stats', statsRouter)
app.use('/api/v1/standing', standingRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await testDbConnection();
    await migrations.syncDB()
    app.listen(port, console.log(`Server listening port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

start()