// dependencies
// terminal output styling
const chalk = require('chalk');
// file path utility
const path = require('path');
// express server
const express = require('express');
// module to store session data cookies
const session = require('express-session');
// handlebars as template engine
const exphbs = require('express-handlebars');
// api routes
const routes = require('./Controllers');
// helper utility functions
const helpers = require('./Utils/Helpers');
// npm cronjob module for automated watering schedule
var CronJob = require('cron').CronJob;
// plant model
const { Plant } = require('./Models/index');
// database connection
const sequelize = require('./config/Connection');
//sequelize model querying
const Op = require('sequelize').Op;
const { put } = require('./Controllers');
// store session cookies
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initialize express with local port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// user session with timeout
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict', 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// use session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware specification
// implement images for handlebars
app.use(express.static('images'));
// json parsing
app.use(express.json());
// parsing urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// implement server path to public directory
app.use(express.static(path.join(__dirname, 'public')));

// use routes export
app.use(routes);

// begin db connection and listen on specified server port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(chalk.bgHex('#2c2e28').white(`Now listening at port ${PORT}`)));
});


//adds one to every plant's column for days since last watering, at midnight every day
var cron = new CronJob(
	'0 0 0 * * *',
	async function() {
   const plantUpdate = await Plant.update(
    {
      waterCurrent: sequelize.literal('water_Current + 1'),
    },
    {
      where: {
        id: {[Op.like]:'%'}
      }
    }
   )
   console.log('did the thing!');
	},
	null,
	true,
	'America/Los_Angeles'
);

cron;