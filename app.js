const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config');

const userRoute = require('./routes/user')
const studentRoute = require('./routes/student')
const authRoute = require('./routes/auth')

const app = express();

const port = process.env.PORT || 8080

// Import Routes
app.use(express.json());

/**
 * Main Route Scope
 */
app.use('/api/user', userRoute);
app.use('/api/v1', studentRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
   res.send('We are in home.');
})

/**
 * DB Scope
 */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection
.once('open', () => console.log("Connection is healhy."))
.on('error', error => {
   console.log('Connection error', error);
})

app.listen(port);
