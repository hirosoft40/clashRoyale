Sequelize is very complicated(at least for me) and hard to understand the steps.
After trying many times, I decided to write the step.

<ol>
<li>sequelize init</li>
this will create following folders 
 |- conig
      |- config.json // set up database information /sql light, postgres, mySQL
|- models       
|- migrations

<li>create models</li>
This is database model and needs to be completed before set up database. 
// this part should define columns besides foreign keys
<code>
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
</code>

<li>sync / db:migrate</li>
There are 2 ways to create database

// crate tables force:true will overwrite tables if exists
// db.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })

<li>JOIN</li>
include
{required:true} ==> inner join
{required:false} ==> default , left outer join

(5) if I do not want to timestamp, freeze tableName</li>
I can put in model.
var Bar = sequelize.define('Bar', { /* bla */ }, {
  timestamps: false,
  freezeTableName: true
})