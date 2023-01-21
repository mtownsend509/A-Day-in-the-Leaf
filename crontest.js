var CronJob = require('cron').CronJob;
const Plant = require('./Models/index');


// var job = new CronJob(
// 	'* * * * * *',
// 	async function() {
// 		Plant.update(
// 			{ height: sequelize.literal('height + 100') },
// 		  );
// 	},
// 	null,
// 	true,
// 	'America/Los_Angeles'
// );

// module.exports = job
var test = new CronJob(
	'* * * * * *',
	async function() {
   const thing = await fetch('/api/plant' , {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
   })
   console.log('did the thing!');
	},
	null,
	true,
	'America/Los_Angeles'
);