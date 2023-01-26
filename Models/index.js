// dependencies
const Profile = require('./Profile');
const Plant = require('./Plant');
const Graveyard = require('./Graveyard');

// model relationships
Profile.hasMany(Plant, {
  foreignKey: 'profile_id',
  onDelete: 'CASCADE'
});

Plant.belongsTo(Profile, {
  foreignKey: 'profile_id'
});

Graveyard.belongsTo(Profile, {
  foreignKey: 'profile_id'
})

module.exports = { Profile , Plant, Graveyard };