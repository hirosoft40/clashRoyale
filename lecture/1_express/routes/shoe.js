let express = require('express');
let router = express.Router();

router.get('/name', (req, res) =>{
    var fname = req.param('fname');
    var lname = req.param('lname');

    res.send(`<h1>my name is ${fname} ${lname}<h1>`)
});

module.exports = router;