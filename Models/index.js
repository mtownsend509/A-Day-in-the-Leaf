const Profile = require('./Profile');
const Plant = require('./Plant');

Profile.hasMany(Plant, {
  foreignKey: 'profile_ID',
  onDelete: 'CASCADE'
});

Plant.belongsTo(Profile, {
  foreignKey: 'profile_ID'
});

module.exports = { Profile , Plant };