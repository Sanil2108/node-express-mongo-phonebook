const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config()

mongoose.connect('mongodb://localhost/phonebook', { useNewUrlParser: true }).then(() => console.log("Database initialized."));

const userRouter = require('./users/routes');
const contactRouter = require('./contacts/routes');

const app = express();

// Setting up session and session store
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 4,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public/'), { extensions: ['html'] }));

app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

