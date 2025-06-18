const express = require('express');
const app = express();
const { PORT } = require('./constants/index');
//import routes
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//import passport middleware strategy
require('./middlewares/passport-middleware');

//initialize routes
app.use('/api', authRoutes);
//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT} `)
        })
    } catch(error) {
        console.log(`Error: ${error.message}`)
    }
};

appStart();