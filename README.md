# CLASH ROYALE COMMUNITY

<hr>
<a href='https://crcommunity.herokuapp.com/'>Click Here for Live Site </a>
<br/>
<br/>
<img src = 'screenshots/all.gif'>
<hr>
<p>This is my first full stack project at DigitalCrafts and one of my favorite project. The main purpose of this project is to learn Node.js and Express. I got an inspiration from my son. His friends and he often talks about this game.I decided to make something that we both can enjoy and I want to provide a place that they can chat online safely.
</p>
<br>
<h3> Target </h3>
This website is for the people who started playing clash royale game and who wants to chat with fellow players.



## What I used
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>JSON</li>
<li>Bootstrap 4</li>
<li>jQuery</li>
<li>Ajax</li>
<li>Node.js</li>
<li>Express</li>
<li>PostgreSQL</li>
<li>Sequelize</li>


## Features
* Watch youTube video
* View cards available on Clash Royale by Type, Rarity, Arena
* Search Card
* Feedback 
* Chat with your friends

## Screenshots
<h4>Index Page: Watch youTube and links for game communities</h4>
<img src = 'screenshots/index.png'>

<h4>Card Page: Able to check all cards by Type, Rarity, Arena</h4>
<img src = 'screenshots/cards.png'>

<h4>Feedback Page: Feedback datas are stored into database</h4>
<img src = 'screenshots/feedback.png'>

<h4>Search Bar: Able to search card by name</h4>
<img src = 'screenshots/search.png'>

## My Challenges
My biggest challenge for this site was Sequelize. Although I have previous experience on SQL, ORM Sequelize was new to me. After trying few times creating models, I was able to understand better on how we define models. 
For the querying part, I found it was much easier to write SQL first to get clear understanding on results, and then work on Sequelize.

## My Note on Sequelize
 <ol>
<li>sequelize init</li>
this will create following folders <br/>
 |- conig<br/>
      |- config.json // set up database information /sql light, postgres, mySQL<br/>
|- models       <br/>
|- migrations<br/>

<li>create models</li>
This is database model and needs to be completed before set up database. <br/>
// this part should define columns besides foreign keys
<code>
const arenas = sequelize.define('arenas', {<br/>
    name: DataTypes.STRING,<br/>
    arenaName: DataTypes.STRING<br/>
  }, {});<br/>
// This area should define foreign keys<br/>
    arenas.associate = function(models) {<br/>
    // associations can be defined here<br/>
    arenas.hasMany(models.cards,{<br/>
      onDelete:'CASCADE',<br/>
      foreignKey:'arena_id'<br/>
    });<br/>
  };<br/>
</code>

<li>sync / db:migrate</li>
There are 2 ways to create database<br/>
<br/>
// crate tables force:true will overwrite tables if exists<br/>
// db.sequelize.sync({force:true}).then(()=>{<br/>
//     app.listen(3500)<br/>
// })<br/>
<br/>
<li>JOIN</li>
Specify include<br/>
<code>
include: [<br/>
        {model:db.types,required:true}<br/>
        , { model:db.rarities,requiredx:true}<br/>
        , { model:db.arenas,required:true}<br/>
        , { model:db.elixircosts, required:true<br/>
        }]<br/>
,where: {<br/>
        name: {[Sequelize.Op.iLike]: `%${searchID}%`}<br/>
        }<br/>
</code>

<img src='screenshots/sequelize.png'>
