require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
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


// routes
// app.use('/', require('./routes/root'));
// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

// app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'));
// app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
    console.log('catch all :( ');
    res.status(404);
    res.json({ "error": "not found :( " });

});


mongoose.connection.once('open', () => {
    console.log('Connected to mongo db')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})