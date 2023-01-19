const Profile = require('./Profile');
const Plant = require('./Plant');

Profile.hasMany(Plant, {
  foreignKey: 'profileId',
  onDelete: 'CASCADE'
});

Plant.belongsTo(Profile, {
  foreignKey: 'profileId'
});

module.exports = { Profile , Plant };