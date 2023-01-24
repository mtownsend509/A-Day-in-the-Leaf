const chalk = require('chalk');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./Controllers');
const helpers = require('./Utils/Helpers');
var CronJob = require('cron').CronJob;
const { Plant } = require('./Models/index');

const sequelize = require('./config/Connection');
const Op = require('sequelize').Op;
const { put } = require('./Controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

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

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//test
// app.use(express.static('public'))

//test
//  app.engine('handlebars', hbs.engine({   extname: '.hbs',
//    defaultLayout: false,
//    layoutsDir: 'views'
//  }));

//  app.set( 'view engine', 'hbs');

app.use(express.static('images'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(chalk.bgHex('#2c2e28').white(`Now listening at port ${PORT}`)));
});

var test = new CronJob(
	'* 59 23 * * *',
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

test;

