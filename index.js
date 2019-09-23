const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const exphb = require('express-handlebars');
const Handlebars = require('handlebars');
const passport = require('passport');

require('dotenv').config();
const userPageHelper=require('./helpers/handlebars');
userPageHelper.userPage(Handlebars);

const app = express();

const port = process.env.PORT || 8000;

const indexRoute = require('./routes/index.route');
const flowersRoute = require('./routes/flowers.route');
const usersRoute = require('./routes/users.route');

app.set('views', './views');
app.engine('.handlebars', exphb({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.static('./public'));
app.use(express.static('files'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(session({ cookie: { maxAge: null }, secret: 'secret', name: 'session', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
	res.locals.messages = require('express-messages')(req, res)();
	next();
});

app.all('*', (req, res, next) => {
	res.locals.user = req.user || null;
	next();
})

app.use('/', indexRoute);
app.use('/flowers', flowersRoute);
app.use('/users', usersRoute);

app.use((req, res, next) => {
	let err = new Error('Not found!!!');
	err.status = 404;
	next(err);
});

app.listen(port, () => { console.log(`Server is running at port ${port}...!`) });