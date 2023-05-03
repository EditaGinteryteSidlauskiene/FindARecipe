//This is the main file of the web application

//env file will be uploaded only if the server is not in the production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const MongoStore = require('connect-mongo');

const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const reviewRoutes = require('./routes/reviews');

const dbUrl = process.env.DB_URL;

main().catch(err => console.log(err));

//Connecting to mongoose
async function main() {
    await mongoose.connect(dbUrl);
    // Making sure that the database is connected
    console.log('Database connected');
}

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// To parse the input text
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Determining the secret
const secret = process.env.SECRET || 'thisisasecret';

//Creating a new variable to store data
//Will be using the same database location, specifying secret, 
//preventing unnecessary saves or updates when the data does not change
const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

//Looking for any errors
store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e);
})

//Session configuration
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//Serializing user to the session
passport.serializeUser(User.serializeUser());
//Deserializing the user
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    //the middleware checks if the request came from the login route,
    //if it didn't then it assigns the originalUrl value to the session
    //as returnTo.
    if (!['/login'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/reviews', reviewRoutes);

//Displaying home page
app.get('/', (req, res) => {
    res.render('home');
})

//For all types of requests, if there is an error, message and status code will be displayed
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

//Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something Went Wrong';
    res.status(statusCode).render('error', { err });
})

//Connecting to the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})
