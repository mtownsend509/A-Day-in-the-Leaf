const Profile = require('./Profile');
const Plant = require('./Plant');

Profile.hasMany(Plant, {
  foreignKey: 'profile_id',
  onDelete: 'CASCADE'
});

Plant.belongsTo(Profile, {
  foreignKey: 'profile_id'
});

module.exports = { Profile, Plant };

