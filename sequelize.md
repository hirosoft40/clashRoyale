Sequelize is very complicated(at least for me) and hard to understand the steps.
After trying many times, I decided to write the step.

(1) sequelize init
this will create following folders 
 |- conig
      |- config.json // set up database information /sql light, postgres, mySQL
|- models       
|- migrations
    I forgot if this is after or before db:migrate

(2) create models
This is database model and needs to be completed before set up database. 
// this part should define columns besides foreign keys
const arenas = sequelize.define('arenas', {
    name: DataTypes.STRING,
    arenaName: DataTypes.STRING
  }, {});
// This area should define foreign keys
    arenas.associate = function(models) {
    // associations can be defined here
    arenas.hasMany(models.cards,{
      onDelete:'CASCADE',
      foreignKey:'arena_id'
    });
  };

(3) sync / db:migrate
// crate tables force:true will overwrite tables if exists
// db.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })

(4) 