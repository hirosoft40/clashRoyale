const express = require('express');
const app = express();
// const dataFile = require('./data/json/clashRoyaleData.json');
// const socket = require('socket.io');
const db = require('./models/')
const flash = require('connect-flash');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// ==== Server set up 
const http = require('http').Server(app);
const io  = require('socket.io')(http);

// Passport config
require('./config/passport')(passport);

// app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static files
app.use(express.static('public'));

// === bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var myStore = new SequelizeStore({db:db.sequelize});

// Express session
app.use(session({
    secret: 'secret login',
    store: myStore,
    resave: true,
    saveUninitialized: true,
    proxy:true
}))




// db.sequelize.sync();

// ===== INSERT DATA
// db.types.bulkCreate([{name:'Troops'},{name:'Buildings'},{name:'Spells'}]);
// db.rarities.bulkCreate([{name:'Common'},{name:'Rare'},{name:'Epic'},{name:'Legendary'}])
// db.arenas.bulkCreate([
//     {name:'Training Camp', arenaName:'Training Camp'}
//     ,{name:'Arena 1', arenaName:'Goblin Stadium'}
//     ,{name:'Arena 2', arenaName:'Bone Pit'}
//     ,{name:'Arena 3', arenaName:'Barbarian Bowl'}
//     ,{name:'Arena 4', arenaName:"P.E.K.K.A.'s Playhouse Cards"}
//     ,{name:'Arena 5', arenaName:'Spell Valley Cards'}
//     ,{name:'Arena 6', arenaName:"Builder's Workshop"}
//     ,{name:'Arena 7', arenaName:'Royal Arena'}
//     ,{name:'Arena 8', arenaName:'Frozen Peak'}
//     ,{name:'Arena 9', arenaName:'Jungle Arena'}
//     ,{name:'Arena 10',arenaName:'Hog Mountain'}
//     ,{name:'Arena 11',arenaName:'Electro Valley'}
// ])


// db.elixircosts.bulkCreate([
//     {name:'Elixir Cost 1'}
//     ,{name:'Elixir Cost 2'}
//     ,{name:'Elixir Cost 3'}
//     ,{name:'Elixir Cost 4'}
//     ,{name:'Elixir Cost 5'}
//     ,{name:'Elixir Cost 6'}
//     ,{name:'Elixir Cost 7'}
//     ,{name:'Elixir Cost 8'}
//     ,{name:'Elixir Cost 9'}
//     ]);

//  db.feelings.bulkCreate([
//     {name:'smile', icon:'fa-grin-stars'}
//     ,{name:'laugh', icon:'fa-laugh'}
//     ,{name:'surprise', icon:'fa-surprise'}
//     ,{name:'sad', icon:'fa-sad-tear'}
//     ,{name:'tired', icon:'fa-tired'}
//     ,{name:'angry', icon:'fa-angry'}
// ])

//  db.cards.bulkCreate([
//     {name:'Barbarian Hut',type_id:2,elixir_id:7,rarity_id:2,arena_id:4,summary:"The Barbarian Hut card is unlocked from the Barbarian Bowl (Arena 3). It is a high-hitpoint building that spawns a pair of Barbarians with moderate hitpoints and damage every 14 seconds. A Barbarian Hut card costs 7 Elixir to deploy.",img_url:'BarbarianHutCard.png'}
//     ,{name:'Bomb Tower',type_id:2,elixir_id:4,rarity_id:2,arena_id:11,summary:"Defensive building that houses a Bomber. Deals area damage to anything dumb enough to stand near it.The Bomb Tower card is unlocked from the Hog Mountain (Arena 10). It is an area damage, medium-ranged building with both moderate hitpoints and damage. A Bomb Tower card costs 4 Elixir to deploy. The Tower will throw bombs, just like the Bomber, to any opposing troops in its defensive radius. However, it cannot attack air units. The thrown bombs deal area damage, which is perfect against swarm units with relatively low health such as the Skeleton Army and Barbarians.",img_url:'BombTowerCard.png'}
//     ,{name:'Cannon',type_id:2,elixir_id:3,rarity_id:1,arena_id:4,summary:"The Cannon card is unlocked from the Barbarian Bowl (Arena 3). It is a single-target, short-ranged defensive building with moderate hitpoints and damage. It fires cannonballs toward ground troops but is unable to target air troops. A Cannon card costs 3 Elixir to deploy.",img_url:'CannonCard.png'}
//     ,{name:'Elixir Collector',type_id:2,elixir_id:6,rarity_id:2,arena_id:7,summary:"The Elixir Collector card is unlocked from the Frozen Peak (Arena 8). It is a building with moderate hitpoints that provides the player with extra Elixir. An Elixir Collector card costs 6 Elixir to deploy. It appears as a wooden building with a vertical glass channel in between two wooden seals, in which Elixir keeps pumping up. A pipe and a hose are fixed behind it, with a small puddle of Elixir from it as in the card picture.",img_url:'ElixirCollectorCard.png'}
//     ,{name:'Furnace',type_id:2,elixir_id:4,rarity_id:2,arena_id:6,summary:"The Furnace card is unlocked from the Spells Valley (Arena 5). It is a moderate hitpoint building that spawns a pair of Fire Spirits every 10 seconds. A Furnace card costs 4 Elixir to deploy. It appears to be a cast-iron steam train furnace with a bubbling cauldron of Elixir on top of it. It is also covered with various other props, including a ladder on the side of it, and a pile of firewood on the other.",img_url:'FurnaceCard.png'}
//     ,{name:'Goblin Hut',type_id:2,elixir_id:5,rarity_id:2,arena_id:2,summary:"The Goblin Hut card is unlocked from the Goblin Stadium (Arena 1). It is a medium-hitpoint building that spawns a Spear Goblin every 4.7 seconds. A Goblin Hut card costs 5 Elixir to deploy.",img_url:'GoblinHutCard.png'}
//     ,{name:'Inferno Tower',type_id:2,elixir_id:5,rarity_id:2,arena_id:5,summary:"The Inferno Tower card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4). It is a single-target, medium-ranged defensive building with moderate hitpoints and various damage stages. An Inferno Tower card costs 5 Elixir to deploy. The Inferno Tower's damage increases over time as it remains focused on a single target.",img_url:'InfernoTowerCard.png'}
//     ,{name:'Mortar',type_id:2,elixir_id:4,rarity_id:1,arena_id:7,summary:"The Mortar card is unlocked from the Builder's Workshop (Arena 6). It is a long-ranged, moderate-health building that deals moderate area damage and can be used offensively or defensively. It has a blind spot and can only attack ground troops. A Mortar card costs 4 Elixir to deploy. It fires explosive shells slowly, and like the X-Bow and Princess, is capable of attacking a Princess Tower from your side of the Arena.",img_url:'MortarCard.png'}
//     ,{name:'Tesla',type_id:2,elixir_id:4,rarity_id:1,arena_id:12,summary:"The Tesla card is unlocked from the Electro Valley (Arena 11). It is a single-target, medium-ranged defensive building with both moderate hitpoints and damage. When not attacking, the Tesla will retreat underground, invulnerable to any damage. However, like any other building, its lifetime and hitpoints will still decrease. A Tesla card costs 4 Elixir to deploy.",img_url:'TeslaCard.png'}
//     ,{name:'Tombstone',type_id:2,elixir_id:3,rarity_id:2,arena_id:3,summary:"The Tombstone card is unlocked from the Bone Pit (Arena 2). It is a building that spawns one Skeleton every 3.1 seconds. The Tombstone spawns 3 extra Skeletons upon its destruction. A Tombstone card costs 3 Elixir to deploy.",img_url:'TombstoneCard.png'}
//     ,{name:'X-Bow',type_id:2,elixir_id:6,rarity_id:3,arena_id:4,summary:"The X-Bow card is unlocked from the Builder's Workshop (Arena 6). It is a single-target, long-ranged offensive and defensive building with both moderate hitpoints and damage output. An X-Bow card costs 6 Elixir to deploy. It appears to be a crossbow with wooden, stone, and metallic features along with a shining steel bolt for ammunition.",img_url:'X-BowCard.png'}
//     ,{name:'Arrows',type_id:3,elixir_id:3,rarity_id:1,arena_id:1,summary:"The Arrows card is unlocked from the Training Camp (Tutorial). It is an area damage Spells with a very wide radius and low-moderate damage. An Arrows card costs 3 Elixir to cast.",img_url:'ArrowsCard.png'}
//     ,{name:'Barbarian Barrel',type_id:3,elixir_id:2,rarity_id:3,arena_id:4,summary:"The Barbarian Barrel card is unlocked from the Barbarian Bowl (Arena 3). It is an area damage Spells with a moderate area of effect and damage. When cast, the Barbarian Barrel rolls across the Arena, damaging ground troops and buildings in its path. After rolling for 5 tiles, it will break open and release a Barbarian. A Barbarian Barrel card costs 2 Elixir to cast.",img_url:'BarbarianBarrelCard.png'}
//     ,{name:'Clone',type_id:3,elixir_id:3,rarity_id:3,arena_id:12,summary:"The Clone card is unlocked from the Electro Valley (Arena 11). It is a Spells that clones, or duplicates, all troops within its relatively large area of effect. However, cloned units and any shields only have one hitpoint. A Clone card costs 3 Elixir to cast. The Clone will push the original unit to the left while the new cloned unit is spawned on the right.",img_url:'CloneCard.png'}
//     ,{name:'Fireball',type_id:3,elixir_id:4,rarity_id:2,arena_id:1,summary:"The Fireball card is unlocked from the Training Camp (Tutorial). It is an area damage Spells with a medium radius and moderately high damage. A Fireball card costs 4 Elixir to cast. It will push back certain small troops.",img_url:'FireballCard.png'}
//     ,{name:'Freeze',type_id:3,elixir_id:4,rarity_id:3,arena_id:6,summary:"The Freeze card is unlocked from the Spells Valley (Arena 5). It is a Spells prevents all enemy units and buildings inside its radius that were placed before the Freeze from moving or attacking. It also deals minor damage. The Freeze card costs 4 Elixir to cast.",img_url:'FreezeCard.png'}
//     ,{name:'Goblin Barrel',type_id:3,elixir_id:3,rarity_id:3,arena_id:2,summary:"The Goblin Barrel card is unlocked from the Goblin Stadium (Arena 1). It is a Spells that launches a barrel from the player's King's Tower. Upon impact, the barrel breaks open and spawns three Goblins. A Goblin Barrel card costs 3 Elixir to deploy.",img_url:'GoblinBarrelCard.png'}
//     ,{name:'Graveyard',type_id:3,elixir_id:5,rarity_id:4,arena_id:6,summary:"The Graveyard card is unlocked from the Spells Valley (Arena 5) or a Legendary Chest. It is a Spells with a wide radius that spawns 16 Skeletons. The Skeletons appear one by one in random positions on the edge of the Spells's radius. The Graveyard can be cast anywhere in the Arena. A Graveyard Spells costs 5 Elixir to cast.",img_url:'GraveyardCard.png'}
//     ,{name:'Giant Snowball',type_id:3,elixir_id:2,rarity_id:1,arena_id:9,summary:"The Giant Snowball card is unlocked from Frozen Peak (Arena 8). It is an area of effect Spells that deals low damage in a 3 tile radius. This Spells slows all enemies within its radius for 2.5 seconds and will knock back all but the heaviest of troops. A Giant Snowball card costs 2 Elixir to cast.",img_url:'GiantSnowballCard.png'}
//     ,{name:'Heal',type_id:3,elixir_id:1,rarity_id:2,arena_id:8,summary:"The Heal card is unlocked from the Royal Arena (Arena 7). It is an area of effect Spells that heals friendly troops. The Heal regenerates your units' health every 0.5 seconds, for a total of four pulses over the 2 seconds duration of the Heal. A Heal card costs 1 Elixir to cast.",img_url:'HealCard.png'}
//     ,{name:'Lightning',type_id:3,elixir_id:6,rarity_id:3,arena_id:5,summary:"The Lightning card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4). It is a Spells with a wide radius and very high damage. When cast, the Lightning will cause three bolts of lightning to rain down from the sky, targeting the 3 troops or buildings with the highest hitpoints within its area of effect, dealing very high damage and a brief stun to each. A Lightning card costs 6 Elixir to cast.",img_url:'LightningCard.png'}
//     ,{name:'Mirror',type_id:3,elixir_id:null,rarity_id:3,arena_id:12,summary:"The Mirror card is unlocked from the Electro Valley (Arena 11). It is a Spells that repeats your last card played for 1 extra Elixir, as the description states. The level of the copied card depends on the level of the Mirror. When in a battle, the card will display your last placed card inside the Mirror. A Mirror card doesn't have a defined Elixir cost; instead, it shows a '?'. At Max level the Mirror will place a card one level higher than your previous card's maximum level, 14.",img_url:'MirrorCard.png'}
//     ,{name:'Poison Spells',type_id:3,elixir_id:4,rarity_id:3,arena_id:6,summary:"The Poison card is unlocked from the Spells Valley (Arena 5). It is an area damage Spells with a fairly wide radius and moderate damage. It creates a circular area in which troops and buildings are damaged slowly over time. It is a deep orange liquid in a thin oblong vial. A Poison card costs 4 Elixir to cast.",img_url:'PoisonSpellsCard.png'}
//     ,{name:'Rage',type_id:3,elixir_id:2,rarity_id:3,arena_id:11,summary:"The Rage card is unlocked from the Hog Mountain (Arena 10). It is a Spells that increases the attack speed and movement speed of troops and buildings by 35% in the Spells's area of effect. A Rage card costs 2 Elixir to cast. The Rage is a deep purple potion packed in a large bottle similar to its Clash of Clans counterpart.",img_url:'RageCard.png'}
//     ,{name:'Rocket',type_id:3,elixir_id:6,rarity_id:2,arena_id:7,summary:"The Rocket card is unlocked from the Builder's Workshop (Arena 6). It is an area damage Spells with a small radius that inflicts very high damage on impact. A Rocket card costs 6 Elixir to cast. It is a damage dealing Spells that launches a large missile from the King's Tower.",img_url:'RocketCard.png'}
//     ,{name:'The Log',type_id:3,elixir_id:2,rarity_id:4,arena_id:7,summary:"The Log card is unlocked from the Builder's Workshop (Arena 6) or a Legendary Chest. It is an area damage Spells with a wide radius and moderate damage. The Log costs 2 Elixir to cast. When cast, The Log rolls through the Arena, dealing damage and knocking back any ground troops in its path before disintegrating after rolling for 11.1 tiles.",img_url:'TheLogCard.png'}
//     ,{name:'Tornado',type_id:3,elixir_id:3,rarity_id:3,arena_id:9,summary:"The Tornado card is unlocked from Frozen Peak (Arena 8). It is an area damage Spells with a wide radius and low damage. A Tornado card costs 3 Elixir to cast. It pulls troops towards the center of the Spells, making them more vulnerable to splash damage. The card image shows a tornado with a pig (possibly the Hog Rider's) being sucked into the tornado. A Tornado slightly damages an enemy unit in its area of effect every 0.5 seconds.",img_url:'TornadoCard.png'}
//     ,{name:'Zap',type_id:3,elixir_id:2,rarity_id:1,arena_id:5,summary:"The Zap card is unlocked from P.E.K.K.A.'s Playhouse (Arena 4). It is an area damage Spells with a medium radius and low damage. When used, this Spells can stun enemies in its effective radius for 0.5 seconds. A Zap card costs 2 Elixir to cast.",img_url:'ZapCard.png'}
//     ,{name:'Archers',type_id:1,elixir_id:3,rarity_id:1,arena_id:1,summary:"The Archers card is unlocked from the Training Camp (Tutorial). It spawns two single-target, medium-ranged Archers with both low hitpoints and low damage output. An Archers card costs 3 Elixir to deploy. They wield bows, bear capes of their team's color, and wear emerald green tunics.",img_url:'ArchersCard.png'}
//     ,{name:'Baby Dragon',type_id:1,elixir_id:4,rarity_id:3,arena_id:1,summary:"The Baby Dragon card is unlocked from the Training Camp (Tutorial). It is a short ranged, area damage, flying troop with moderately high hitpoints and low damage. A Baby Dragon card costs 4 Elixir to deploy. The Baby Dragon is a small, green baby dragon with short, stubby wings.",img_url:'BabyDragonCard.png'}
//     ,{name:'Balloon',type_id:1,elixir_id:5,rarity_id:3,arena_id:3,summary:"The Balloon card is unlocked from the Bone Pit (Arena 2). It is a building-targeting, flying troop with moderate hitpoints and very high damage output that deals moderate death damage, in the form of a bomb, when defeated. A Balloon card costs 5 Elixir to deploy. It is a hot air balloon held together by patches and ropes, and piloted by a Skeleton with an aviator cap. The bomb dropped upon defeat detonates after 3 seconds.",img_url:'BalloonCard.png'}
//     ,{name:'Bandit',type_id:1,elixir_id:3,rarity_id:4,arena_id:10,summary:"The Bandit card is unlocked from the Jungle Arena (Arena 9) or a Legendary Chest. She is a troop with moderate hitpoints and damage that has the ability to dash to nearby targets, dealing double damage if she hits a target with her dash, similar to a Prince's charge. She is immune to damage while dashing. A Bandit card costs 3 Elixir to deploy. She has white hair, wears a mask, and wields a blackjack.",img_url:'BanditCard.png'}
//     ,{name:'Barbarians',type_id:1,elixir_id:5,rarity_id:1,arena_id:4,summary:"The Barbarians card is unlocked from the Barbarian Bowl (Arena 3). It spawns four single-target, melee Barbarians with moderate hitpoints and damage. A Barbarians card costs 5 Elixir to deploy. Barbarians wield short swords and have blonde hair and moustaches.",img_url:'BarbariansCard.png'}
//     ,{name:'Bats',type_id:1,elixir_id:2,rarity_id:1,arena_id:6,summary:"The Bats card is unlocked from Spells Valley (Arena 5). It spawns five single-target, melee Bats with very low hitpoints and damage. They are the same as those spawned by the Night Witch. A Bats card costs 2 Elixir to deploy",img_url:'BatsCard.png'}
//     ,{name:'Battle Ram',type_id:1,elixir_id:4,rarity_id:2,arena_id:4,summary:"The Battle Ram card is unlocked from Barbarian Bowl (Arena 3). It is a single-target, melee troop with both moderate hitpoints and damage. It targets buildings over other units. Like a Prince or Dark Prince, it will begin to charge towards its target after traveling some distance, and deals double damage if it hits its target whilst charging. Once the Battle Ram has hit a target or loses all its hitpoints, it will break and reveal the two Barbarians underneath. A Battle Ram card costs 4 Elixir to deploy.",img_url:'BattleRamCard.png'}
//     ,{name:'Bomber',type_id:1,elixir_id:3,rarity_id:1,arena_id:1,summary:"The Bomber card is unlocked from the Bone Pit (Arena 2). It is an area damage, medium-ranged troop with low hitpoints and moderately high damage. A Bomber card costs 3 Elixir to deploy. The Bomber is a skeleton that carries a black bomb and wears a cap with golden-rimmed pilot's goggles.",img_url:'BomberCard.png'}
//     ,{name:'Bowler',type_id:1,elixir_id:5,rarity_id:3,arena_id:9,summary:"The Bowler card is unlocked from the Frozen Peak (Arena 8). He is a medium-ranged, area damage troop with high hitpoints and moderate damage. The Bowler throws massive boulders which roll linearly, damaging and knocking back his target and any other units in the boulder's path. A Bowler card costs 5 Elixir to deploy.",img_url:'BowlerCard.png'}
//     ,{name:'Cannon Cart',type_id:1,elixir_id:5,rarity_id:3,arena_id:7,summary:"The Cannon Cart card is unlocked from Builder's Workshop (Arena 6). It is a single-target, medium-ranged troop with moderate hitpoints and damage output. Half of its health comes from the cart that carries the Cannon, and the other half is the actual Cannon's health. When the cart breaks, the Cannon Cart loses its wheels and becomes a stationary turret. The first portion of its health is represented by a shield which behaves identically to shields belonging to the Dark Prince and Guards, being able to absorb excess damage. When the cart is broken, it behaves like a building with a lifetime of 30 seconds. Troops that target buildings, such as the Giant, will begin to target the Cannon Cart when its cart is broken. Additionally, it will no longer be affected by cards that affect only troops, such as the Heal, Tornado, or Clone. A Cannon Cart card costs 5 Elixir to deploy.",img_url:'CannonCartCard.png'}
//     ,{name:'Dart Goblin',type_id:1,elixir_id:3,rarity_id:2,arena_id:10,summary:"The Dart Goblin card is unlocked from the Jungle Arena (Arena 9). He is a very fast single-target, long-ranged troop with low hitpoints, a moderate damage output, and a very fast attack rate. A Dart Goblin card costs 3 Elixir to deploy.",img_url:'DartGoblinCard.png'}
//     ,{name:'Dark Prince',type_id:1,elixir_id:4,rarity_id:3,arena_id:8,summary:"The Dark Prince card is unlocked from the Royal Arena (Arena 7). He is an area damage, melee troop with both moderate hitpoints and damage, and has a shield in addition to his normal health. He has a special ability: as the Dark Prince continues to run, after traveling 3.5 tiles, he will gain a speed boost and will charge up. Upon hitting a troop or building, he will deal 2× damage while immediately losing the speed bonus. However, he can regain it if he starts to move again and does not encounter another enemy for another 2 seconds. Note that his charge attack has a 360º effect, like a Valkyrie, but his normal attacks are directional like a Wizard or Baby Dragon. A Dark Prince card costs 4 Elixir to deploy. The Dark Prince takes an appearance as a man mostly covered in black armor with shining blue eyes, eyebrows, a nose visible and a part of his neck as well. He carries a spiked club and wooden shield and rides a pony the same breed as his counterpart, the Prince.",img_url:'DarkPrinceCard.png'}
//     ,{name:'Elite Barbarians',type_id:1,elixir_id:6,rarity_id:1,arena_id:11,summary:"The Elite Barbarians card is unlocked from the Hog Mountain (Arena 10). It spawns two single-target, melee, stronger, faster Barbarians with moderate hitpoints and very high damage. An Elite Barbarians card costs 6 Elixir to deploy.",img_url:'EliteBarbariansCard.png'}
//     ,{name:'Electro Dragon',type_id:1,elixir_id:5,rarity_id:3,arena_id:12,summary:"The Electro Dragon card is unlocked from Electro Valley (Arena 11). The Electro Dragon is a flying troop with moderate hitpoints and damage. Its attack is a bolt of chain lightning that can hit up to three targets. The Electro Dragon resembles a small blue dragon with blue eyes and glowing spikes on its back. An Electro Dragon card costs 5 Elixir to deploy.",img_url:'ElectroDragonCard.png'}
//     ,{name:'Electro Wizard',type_id:1,elixir_id:4,rarity_id:4,arena_id:12,summary:"The Electro Wizard card is unlocked from the Electro Valley (Arena 11) or a Legendary Chest. He is a double-target, ranged troop with moderate hitpoints and damage. His attacks briefly stun his targets. He stuns and deals minor area damage upon deployment. An Electro Wizard card costs 4 Elixir to deploy.",img_url:'ElectroWizardCard.png'}
//     ,{name:'Executioner',type_id:1,elixir_id:5,rarity_id:3,arena_id:10,summary:"The Executioner card is unlocked from the Jungle Arena (Arena 9). He is an area damage, medium-ranged troop with moderate hitpoints and damage. He throws his axe in a straight line; it will then fly back to him, dealing its damage twice. An Executioner card costs 5 Elixir to deploy.",img_url:'ExecutionerCard.png'}
//     ,{name:'Flying Machine',type_id:1,elixir_id:4,rarity_id:2,arena_id:7,summary:"The Flying Machine card is unlocked from the Builder's Workshop (Arena 6). It is a single-target, flying, ranged troop with moderate hitpoints and damage output. The Flying Machine costs 4 Elixir to deploy. It appears to be a small turret in a barrel with a rotor on top.",img_url:'FlyingMachineCard.png'}
//     ,{name:'Fire Spirits',type_id:1,elixir_id:2,rarity_id:1,arena_id:6,summary:"The Fire Spirits card is unlocked from the Spells Valley (Arena 5). It spawns three area damage, short-ranged Fire Spirits with low hitpoints and moderate damage. A Fire Spirits card costs 2 Elixir to deploy. Fire Spirits launch themselves at their target when attacking, destroying themselves on impact. They resemble small chunks of flaming coal with arms and legs.",img_url:'FireSpiritsCard.png'}
//     ,{name:'Giant',type_id:1,elixir_id:5,rarity_id:2,arena_id:1,summary:"The Giant card is unlocked from the Training Camp (Tutorial). He is a building-targeting, melee troop with very high hitpoints and moderate damage. A Giant card costs 5 Elixir to deploy. He wears a large, brown coat made of cloth and has ginger sideburns and bushy eyebrows with blue eyes.",img_url:'GiantCard.png'}
//     ,{name:'Giant Skeleton',type_id:1,elixir_id:6,rarity_id:3,arena_id:3,summary:"The Giant Skeleton card is unlocked from the Bone Pit (Arena 2). He is a single-target, melee troop with high hitpoints and moderate damage that deals very high death damage when defeated. A Giant Skeleton card costs 6 Elixir to deploy. He appears as a colossal skeleton holding a large explosive, which, upon his death, is 'carelessly' dropped, dealing an enormous amount of damage to all enemy troops/buildings in its blast radius. The bomb explodes 3 seconds after it is dropped.",img_url:'GiantSkeletonCard.png'}
//     ,{name:'Goblin Gang',type_id:1,elixir_id:3,rarity_id:1,arena_id:10,summary:"The Goblin Gang card is unlocked from the Jungle Arena (Arena 9). It spawns 5 low health, single-target troops: 2 Spear Goblins and 3 Goblins. The deployment is always 3 Goblins in the front and 2 Spear Goblins behind. A Goblin Gang card costs 3 Elixir to deploy.",img_url:'GoblinGangCard.png'}
//     ,{name:'Goblin Giant',type_id:1,elixir_id:6,rarity_id:3,arena_id:10,summary:"The Goblin Giant card is unlocked from the Jungle Arena (Arena 9). He is a building-targeting, melee troop with high health and moderate damage. He also carries two Spear Goblins on his back, that can attack independently of the Goblin Giant. When he is taken down, the Spear Goblins emerge and continue attacking. A Goblin Giant card costs 6 Elixir to deploy.",img_url:'GoblinGiantCard.png'}
//     ,{name:'Goblins',type_id:1,elixir_id:2,rarity_id:1,arena_id:2,summary:"The Goblins card is unlocked from the Goblin Stadium (Arena 1). It spawns three fast, single-target, melee Goblins with low hitpoints and medium damage. A Goblins card costs 2 Elixir to deploy.",img_url:'GoblinsCard.png'}
//     ,{name:'Golem',type_id:1,elixir_id:8,rarity_id:3,arena_id:4,summary:"The Golem card is unlocked from the Barbarian Bowl (Arena 3). It is a building-targeting, melee troop with extremely high hitpoints and moderately high damage that deals death damage when defeated. Like the Giant, the Golem has high hitpoints and deals significant damage, targeting only buildings. Upon death, the Golem ruptures into two weaker Golemites, causing moderate area damage. The Golemites continue to deal damage until they are destroyed. Like the Golem, when the Golemites are destroyed, they rupture, dealing low area damage. The Golem is a colossal, menacing rock brute with team-colored crystals growing on its back. Its Golemites have a similar look, but they seem to have one eye each and are much smaller in size. A Golem card costs 8 Elixir to deploy.",img_url:'GolemCard.png'}
//     ,{name:'Guards',type_id:1,elixir_id:3,rarity_id:3,arena_id:8,summary:"The Guards card is unlocked from the Royal Arena (Arena 7). It spawns three single-target, melee-ranged Skeletons with low hitpoints, medium damage, and shields in addition to their normal health. A Guards card costs 3 Elixir to deploy. They appear similar to the Giant Skeleton due to their underbite but are very different in size. They also have the same diagonal scar as normal Skeletons, but have a few exceptions like wooden spears which Spear Goblins bear, wooden shields, and Dark Prince helmets. They are also a bit larger than normal Skeletons.",img_url:'GuardsCard.png'}
//     ,{name:'Fire Spirits',type_id:1,elixir_id:2,rarity_id:1,arena_id:6,summary:"The Fire Spirits card is unlocked from the Spells Valley (Arena 5). It spawns three area damage, short-ranged Fire Spirits with low hitpoints and moderate damage. A Fire Spirits card costs 2 Elixir to deploy. Fire Spirits launch themselves at their target when attacking, destroying themselves on impact. They resemble small chunks of flaming coal with arms and legs.",img_url:'FireSpiritsCard.png'}
//     ,{name:'Hog Rider',type_id:1,elixir_id:4,rarity_id:2,arena_id:5,summary:"The Hog Rider card is unlocked from the Goblin Stadium (Arena 1). He is a very fast building-targeting, melee troop with moderate hitpoints and moderately high damage. A Hog Rider card costs 4 Elixir to deploy. He appears just like his Clash of Clans counterpart; a man with brown eyebrows, a beard, a mohawk, and a golden body piercing in his left ear who is riding a hog.",img_url:'HogRiderCard.png'}
//     ,{name:'Hunter',type_id:1,elixir_id:4,rarity_id:3,arena_id:2,summary:"The Hunter card is unlocked from the Goblin Stadium (Arena 1). He is a short-ranged troop with moderate health who shoots shotgun shells with a wide spread, and each bullet does slight area damage on impact. The Hunter will do more damage up close and less at range. A Hunter card costs 4 Elixir to deploy.",img_url:'HunterCard.png'}
//     ,{name:'Ice Golem',type_id:1,elixir_id:2,rarity_id:2,arena_id:9,summary:"The Ice Golem card is unlocked from the Frozen Peak (Arena 8). It is a building targeting, melee troop with moderate hitpoints and low damage that deals a small amount of death damage when defeated. The Ice Golem is a cheap mini-tank that explodes when killed, dealing slight area death damage similar to the Golem, while additionally slowing down anything nearby for 1 second. An Ice Golem card costs 2 Elixir to deploy.",img_url:'IceGolemCard.png'}
//     ,{name:'Ice Spirit',type_id:1,elixir_id:1,rarity_id:1,arena_id:9,summary:"The Ice Spirit card is unlocked from the Frozen Peak (Arena 8). It is an area damage, very short-ranged troop with low hitpoints and damage. An Ice Spirit card costs 1 Elixir to deploy. Like Fire Spirits, the Ice Spirit attacks by jumping onto the target before disintegrating. The Ice Spirit will freeze affected troops for 1 second.",img_url:'IceSpiritCard.png'}
//     ,{name:'Ice Wizard',type_id:1,elixir_id:3,rarity_id:4,arena_id:6,summary:"The Ice Wizard card is unlocked from the Frozen Peak (Arena 8) or a Legendary Chest. He is a medium-ranged troop with moderate hitpoints and low area damage. The Ice Wizard's attacks will slow his targets' movement and attack speed by 35%. His hair and eyes are blue, and he wears thick robes. An Ice Wizard card costs 3 Elixir to deploy.",img_url:'IceWizardCard.png'}
//     ,{name:'Inferno Dragon',type_id:1,elixir_id:4,rarity_id:4,arena_id:7,summary:"The Inferno Dragon card is unlocked from the Builder's Workshop (Arena 6). It is a single-target, short-ranged, flying troop with moderate hitpoints and has various damage stages. An Inferno Dragon card costs 4 Elixir to deploy. The Inferno Dragon's damage increases over time as it remains focused on a single target, similar to the Inferno Tower. It resembles a Baby Dragon with a helmet and a barrel on its back which appears to be some form of jetpack or fuel storage.",img_url:'InfernoDragonCard.png'}
//     ,{name:'Knight',type_id:1,elixir_id:3,rarity_id:1,arena_id:1,summary:"The Knight card is unlocked from the Training Camp (Tutorial). He is a single-target, melee troop with moderate hitpoints and damage. A Knight card costs 3 Elixir to deploy. The Knight wields a long sword and has a blonde mustache and eyebrows.",img_url:'KnightCard.png'}
//     ,{name:'Lava Hound',type_id:1,elixir_id:7,rarity_id:4,arena_id:5,summary:"The Lava Hound card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4) or a Legendary Chest. It is a building-targeting, short-ranged, flying troop with very high hitpoints and low damage. Upon death, it bursts into 6 spread out Lava Pups which have no preferred target and deal the same damage as the Lava Hound but each have much lower hitpoints. It only attacks buildings, has high hitpoints and splits into smaller units, similar to the Golem. The Lava Hound appears to be a flying, burning rock beast with an underbite, short wings, small rocky dog ears, and small limbs. A Lava Hound card costs 7 Elixir to deploy.",img_url:'LavaHoundCard.png'}
//     ,{name:'Lumberjack',type_id:1,elixir_id:4,rarity_id:4,arena_id:9,summary:"The Lumberjack card is unlocked from the Frozen Peak (Arena 8) or a Legendary Chest. He is a very fast, single-target, melee troop with moderate hitpoints and a high damage output. A Lumberjack card costs 4 Elixir to deploy. Upon death, he drops a bottle of Rage that increases the attack and movement speed of friendly troops and buildings in the Spells's effective radius.",img_url:'LumberjackCard.png'}
//     ,{name:'Magic Archer',type_id:1,elixir_id:4,rarity_id:4,arena_id:11,summary:"The Magic Archer card is unlocked from the Hog Mountain (Arena 10) or a Legendary Chest. He is an area damage, long-ranged troop with moderate damage and hitpoints. The Magic Archer shoots arrows which go linearly to damage the his target and any other units in the arrow's path. A Magic Archer card costs 4 Elixir to deploy.",img_url:'MagicArcherCard.png'}
//     ,{name:'Mega Minion',type_id:1,elixir_id:3,rarity_id:2,arena_id:5,summary:"The Mega Minion card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4). It is a single-target, short-ranged, flying troop with moderate hitpoints and moderately high damage. A Mega Minion card costs 3 Elixir to deploy. It spawns one large Minion wearing a full suit of armor.",img_url:'MegaMinionCard.png'}
//     ,{name:'Mega Knight',type_id:1,elixir_id:7,rarity_id:4,arena_id:11,summary:"The Mega Knight card is unlocked from Hog Mountain (Arena 10) or a Legendary Chest. He is an area damage, ground, melee troop with very high hitpoints and moderately high damage. He deals moderately high spawn damage when deployed and jumps to targets that are between 4 to 5 tiles away from him, dealing 2× his normal area damage on impact. A Mega Knight card costs 7 Elixir to deploy. The Mega Knight wears black armor with a helmet that covers most of his face and wields two mace-like weapons attached to his arms.",img_url:'MegaKnightCard.png'}
//     ,{name:'Miner',type_id:1,elixir_id:3,rarity_id:4,arena_id:5,summary:"The Miner card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4) or a Legendary Chest. He is a single-target, melee troop with both moderate hitpoints and damage. A Miner card costs 3 Elixir to deploy. The Miner is the only troop that can be deployed anywhere on the Arena. He appears to be a joyous digger with a bright red nose, a shovel, and a black helmet with a candle on it.",img_url:'MinerCard.png'}
//     ,{name:'Mini P.E.K.K.A',type_id:1,elixir_id:4,rarity_id:2,arena_id:1,summary:"The Mini P.E.K.K.A. card is unlockable from the Training Camp (Tutorial). He is a single-target, melee troop with moderate hitpoints and high damage. A Mini P.E.K.K.A card costs 4 Elixir to deploy. He wears gray metal armor and wields a huge sword. His horns are a bright vivid team color, along with his single eye.",img_url:'MiniPEKKACard.png'}
//     ,{name:'Minion Horde',type_id:1,elixir_id:5,rarity_id:1,arena_id:5,summary:"The Minion Horde card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4). It deploys six single-target, short-ranged, flying Minions with low hitpoints and moderate damage. A Minion Horde card costs 5 Elixir to deploy.",img_url:'MinionHordeCard.png'}
//     ,{name:'Minions',type_id:1,elixir_id:3,rarity_id:1,arena_id:1,summary:"The Minions card is unlocked from the Training Camp (Tutorial). It spawns three single-target, short-ranged, flying Minions with low hitpoints and moderate damage. A Minions card costs 3 Elixir to deploy. A Minion's appearance is that of a bluish purple gargoyle with large horns, stubby wings, and large hands with sharp vicious claws.",img_url:'MinionsCard.png'}
//     ,{name:'Musketeer',type_id:1,elixir_id:4,rarity_id:2,arena_id:1,summary:"The Musketeer card is unlocked from the Training Camp (Tutorial). She is a single-target, medium-ranged troop with both moderate hitpoints and damage. A Musketeer card costs 4 Elixir to deploy. She has purple combed hair, a blunderbuss-styled musket and a metal helmet with a tiny crater on it.",img_url:'MusketeerCard.png'}
//     ,{name:'Night Witch',type_id:1,elixir_id:4,rarity_id:4,arena_id:6,summary:"The Night Witch card is unlocked from Spells Valley (Arena 5) or a Legendary Chest. She is a single-target melee troop with moderate hitpoints and high damage. She summons 2 Bats every 7 seconds, in addition to summoning two Bats upon death. A Night Witch card costs 4 Elixir to deploy.",img_url:'NightWitchCard.png'}
//     ,{name:'P.E.K.K.A',type_id:1,elixir_id:7,rarity_id:3,arena_id:5,summary:"The P.E.K.K.A. card is unlocked from the P.E.K.K.A.'s Playhouse (Arena 4). She is a single-target, ground melee troop with both very high hitpoints and damage. A P.E.K.K.A. card costs 7 Elixir to deploy. She wears heavy dark blue armor, has team colored horns and eyes, and wields a steel sword.",img_url:'PEKKACard.png'}
//     ,{name:'Prince',type_id:1,elixir_id:5,rarity_id:3,arena_id:1,summary:"The Prince card is unlocked from the Training Camp (Tutorial). He is a single-target, melee troop with high hitpoints and damage. He has a special ability: if he walks 3.5 tiles uninterrupted, he will begin to charge, gaining a movement speed and damage boost. Upon hitting a troop or building, he will deal double his normal damage and stop charging. A Prince card costs 5 Elixir to deploy. He resembles a Knight in golden armor, wields a striped lance, has a brown beard, and rides on a pony.",img_url:'PrinceCard.png'}
//     ,{name:'Princess',type_id:1,elixir_id:3,rarity_id:4,arena_id:8,summary:"The Princess card is unlocked from the Royal Arena (Arena 7) or a Legendary Chest. She is an area damage, long-ranged troop with low hitpoints and moderate damage. Her long range allows her to target and attack Princess Towers from the opposite side of the river. A Princess card costs 3 Elixir to deploy.",img_url:'PrincessCard.png'}
//     ,{name:'Ram Rider',type_id:1,elixir_id:5,rarity_id:4,arena_id:11,summary:"The Ram Rider card is unlocked from Hog Mountain (Arena 10) or a Legendary Chest. It spawns a moderate-high health woman riding a ram. The Ram itself targets buildings while the Rider only targets troops, rooting them. A Ram Rider card costs 5 Elixir to deploy.",img_url:'RamRiderCard.png'}
//     ,{name:'Rascals',type_id:1,elixir_id:5,rarity_id:1,arena_id:10,summary:"The Rascals card is unlocked from the Jungle Arena (Arena 9). It spawns a single-target, melee Rascal Boy with moderate hitpoints and damage and two single-target, medium-ranged Rascal Girls with low hitpoints and moderate damage output. The deployment is always a Rascal Boy in the front and 2 Rascal Girls behind. A Rascals card costs 5 Elixir to deploy.",img_url:'RascalsCard.png'}
//     ,{name:'Royal Giant',type_id:1,elixir_id:6,rarity_id:1,arena_id:8,summary:"The Royal Giant card is unlocked from the Royal Arena (Arena 7). He is a building targeting, long-ranged troop with very high hitpoints and moderate damage. A Royal Giant costs 6 Elixir to deploy. Its appearance is similar to that of a Giant but he sports a darker colored cloth coat, has a mustache with sideburns which go down to his chin, wears an earring on his right ear, and wields a cannon in one hand and a cannonball in the other.",img_url:'RoyalGiantCard.png'}
//     ,{name:'Royal Ghost',type_id:1,elixir_id:3,rarity_id:4,arena_id:8,summary:"The Royal Ghost card is unlocked from the Royal Arena (Arena 7) or a Legendary Chest. He is an area damage, melee troop with moderate hitpoints and damage. A Royal Ghost card costs 3 Elixir to deploy.",img_url:'RoyalGhostCard.png'}
//     ,{name:'Royal Hog',type_id:1,elixir_id:5,rarity_id:2,arena_id:11,summary:"The Royal Hogs card is unlocked from Hog Mountain (Arena 10). It spawns four very fast hogs with helmets. They have moderate hitpoints and low damage and can jump over the river. A Royal Hogs card costs 5 Elixir to deploy.",img_url:'RoyalHogsCard.png'}
//     ,{name:'Skeleton Army',type_id:1,elixir_id:3,rarity_id:3,arena_id:1,summary:"The Skeleton Army card is unlocked from the Training Camp (Tutorial). It spawns 15 single-target, melee Skeletons with very low hitpoints and damage. A Skeleton Army card costs 3 Elixir to deploy.",img_url:'SkeletonArmyCard.png'}
//     ,{name:'Skeletons',type_id:1,elixir_id:1,rarity_id:1,arena_id:3,summary:"The Skeletons card is unlocked from the Bone Pit (Arena 2). It spawns three single-target, melee Skeletons with very low hitpoints and damage. A Skeletons card costs 1 Elixir to deploy. They are the same as those spawned by the Witch, Tombstone, Skeleton Barrel, Skeleton Army, and the Graveyard.",img_url:'SkeletonsCard.png'}
//     ,{name:'Skeleton Barrel',type_id:1,elixir_id:3,rarity_id:1,arena_id:7,summary:"The Skeleton Barrel card is unlocked from Builders Workshop (Arena 6). It is a flying, building-targeting troop with medium hitpoints that drops seven Skeletons once it is destroyed or reaches a building, similar to the Battle Ram. A Skeleton Barrel card costs 3 Elixir to deploy. It is a spiked black barrel with a white skull painted on the front tied to three team-colored balloons.",img_url:'SkeletonBarrelCard.png'}
//     ,{name:'Sparky',type_id:1,elixir_id:6,rarity_id:4,arena_id:12,summary:"The Sparky card is unlocked from the Electro Valley (Arena 11) or a Legendary Chest. She is an area damage, medium-ranged troop with moderate hitpoints and extremely high damage. A Sparky card costs 6 Elixir to deploy. The Sparky takes the appearance of a siege machine with a tesla coil mounted atop of it.",img_url:'SparkyCard.png'}
//     ,{name:'Spear Goblins',type_id:1,elixir_id:2,rarity_id:1,arena_id:2,summary:"The Spear Goblins card is unlocked from the Goblin Stadium (Arena 1). It spawns three very fast single-target, medium-ranged Goblins with low hitpoints and very low damage. A Spear Goblins card costs 2 Elixir to deploy. They resemble normal Goblins, but are taller and thinner, have sharper elven ears, wear a team colored bandana, have a spear-case tied to their backs with a rope, and always have a wooden spear in their hands.",img_url:'SpearGoblinsCard.png'}
//     ,{name:'Three Musketeers',type_id:1,elixir_id:9,rarity_id:2,arena_id:8,summary:"The Three Musketeers card is unlocked from the Royal Arena (Arena 7). It spawns three single-target, medium-ranged Musketeers with both moderate hitpoints and damage. A Three Musketeers card costs 9 Elixir to deploy.",img_url:'ThreeMusketeersCard.png'}
//     ,{name:'Valkyrie',type_id:1,elixir_id:4,rarity_id:2,arena_id:3,summary:"The Valkyrie card is unlocked from the Bone Pit (Arena 2). She is an area damage, melee troop with high hitpoints and moderate damage. A Valkyrie card costs 4 Elixir to deploy. She bears orange hair, a double-bladed battle axe, a brown fur coat, and attacks with a powerful whirl of her axe, damaging all the ground troops surrounding her in a 360-degree area of effect.",img_url:'ValkyrieCard.png'}
//     ,{name:'Witch',type_id:1,elixir_id:5,rarity_id:3,arena_id:1,summary:"The Witch card is unlocked from the Training Camp (Tutorial). She is an area damage, medium-ranged troop with moderate hitpoints and low damage output. A Witch card costs 5 Elixir to deploy. Every 5 seconds, the Witch will passively summon a group of three Skeletons the same level as herself.",img_url:'WitchCard.png'}
//     ,{name:'Wizard',type_id:1,elixir_id:5,rarity_id:2,arena_id:6,summary:"The Wizard card is unlocked from the Spells Valley (Arena 5). He is an area-damage, medium-ranged troop with both moderate hitpoints and damage output. A Wizard card costs 5 Elixir to deploy.",img_url:'WizardCard.png'}
//     ,{name:'Zappies',type_id:1,elixir_id:4,rarity_id:2,arena_id:12,summary:"The Zappies card is unlocked from the Electro Valley (Arena 11). It spawns three single-target, medium-ranged Zappies with low hitpoints and damage. Each of their attacks stun the target for a short time. The Zappies card costs 4 Elixir to deploy.",img_url:'ZappiesCard.png'}
//     ]);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// ==== Local Variables ===
// header info
app.locals.pageTitle = 'Clash Royale Community';

// flash
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    if(req.user){
        res.locals.loginname = req.user["username"];
        console.log('My name is', res.locals.loginname)
        } else{
        res.locals.loginname = "";

        }
    next();
})


// NAV bar
db.types.findAll({attributes: ['name']}).then(data=> {app.locals.uniqueType = [...new Set(data.map(item => item.name))]})
db.rarities.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueRarity = [...new Set(data.map(item => item.name))]})
db.arenas.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueArena = [...new Set(data.map(item => item.name))]})

// ==== routes
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/types'));
app.use(require('./routes/api'));
app.use(require('./routes/search'));
app.use('/auth',require('./routes/auth'));


//server
// const PORT = process.env.PORT || 3500;
// const server = app.listen(PORT, function(){
//     console.log(`Server started on port ${PORT}.`)
// })
// app.set('port', process.env.PORT || 3500);


// io.attach(server);
io.on('connection', function(socket) {
    console.log('made socket connetcion', socket.id)

    // handle chat event
    socket.on("chat", data => {
        // all ppls connected to sockets server
        io.sockets.emit('chat',data);
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
});


http.listen(process.env.PORT || 3500, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});