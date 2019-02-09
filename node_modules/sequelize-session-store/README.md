# sequelize-session-store
[![Build Status](https://travis-ci.org/jwoos/javascript_sequelize-session-store.svg?branch=master)](https://travis-ci.org/jwoos/javascript_sequelize-session-store)
[![Dependency Status](https://dependencyci.com/github/jwoos/javascript_sequelize-session-store/badge)](https://dependencyci.com/github/jwoos/javascript_sequelize-session-store)
[![Coverage Status](https://coveralls.io/repos/github/jwoos/javascript_sequelize-session-store/badge.svg?branch=master)](https://coveralls.io/github/jwoos/javascript_sequelize-session-store?branch=master)

### What is this?
This is a session store for use with Express and Sequelize. It strives to be database agnostic, much like Sequelize. Although there are a plethora of session managers for use with a direct connection to the database, I found the choices lacking when it came to usage with Sequelize.

### Installation
```bash
npm install sequelize-session-store
```
1. You need an Express application using the express-session middleware
2. You will also need an instance of Sequelize

### Session Store
The constructor takes an argument object:

1. `sequelize`: This is the sequelize instance
	- Refer to the Sequelize documentation for configuring the instance
2. `model`: A Sequelize model
	- You can define the model yourself with various fields but the following are REQUIRED to be in the table: `sid`, `sess`, `expire`
		-`sid`: varchar, not null, primary key
		-`sess`: json/varchar/text, not null
		-`expire`: timestamp, not null
	- Specifying a model allows relational mappings to other databases and inclusion of other fields
3. `extras`: A function to add data for columns that are not required
	- the function will take an argument of an empty object, add your data with the column name being the key and the value being the value
4. `expiration`: An object for configuring expiration
	- `interval`: millisecond interval for when sessions should be pruned
		- set to false or 0 to disable prune job
		- call `cleanExpired()` manually to clean expired sessions if you disable interval cleaning
	- `life`: millisecond lifetime of a session
		- a session only decays if not accessed

If a sequelize instance is not passed in, an error will be thrown. If you do not pass it a model, one will be created and available for you to access using the SequelizeSessionStore instance.
```sql
-- default table used
CREATE TABLE express_session (
	sid VARCHAR NOT NULL,
	sess TEXT NOT NULL,
	expire TIMESTAMP(6) NOT NULL,
	PRIMARY KEY (sid)
)
```

### Example
```javascript
const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeSessionStore = require('sequelize-session-store')(session);

let sequelize = new Sequelize(); // refer to sequelize documentation on instantiation

let app = express();

let sessionConfig = {
	// express session options here
	store: SequelizeSessionStore({
		model: aSequelizeModel,
		db: sequelize,
		extras: (data) => {
			data.customColumn = 'someData';
		}
	});
};

app.use(session(sessionConfig));
```

### To Do
Check the [to do list](https://github.com/jwoos/javascript_sequelize-session-store/issues)
