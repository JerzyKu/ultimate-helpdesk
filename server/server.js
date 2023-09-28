require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn');
const { isAdminExist } = require('./middleware/isAdminExist');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Connect yo MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

// custom middleware for loggin actions 
app.use(logger)

// // simulate delay response
// app.use((req, res, next) => {
//     setTimeout(() => next(), 2000);
// });

// routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/api/users'));
app.use('/assets', require('./routes/api/assets'))

app.all('*', (req, res) => {
    console.log('catch all :( ');
    res.status(404);
    res.json({ "error": "not found :( " });

});

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to mongo db')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    isAdminExist()
})

