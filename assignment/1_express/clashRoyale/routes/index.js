const express = require('express');
const router = express.Router();
let html = '';
router.get('/',(req, res)=>{
    html = `
    <body style=" background: #1488CC;  /* fallback for old browsers */
                  background: -webkit-linear-gradient(to bottom, #2B32B2, #1488CC);  /* Chrome 10-25, Safari 5.1-6 */
                  background: linear-gradient(to bottom, #2B32B2, #1488CC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    "> 
        <h1 style="text-align:center; margin:30px; color:white;">
        Create a Dynamic Website in Node [CLASH ROYALE]
        </h1>

        <h3 style="margin-top:10vh; text-align:center; color:#fff9e5;">I made this site as a part of a project through <a href='https://www.digitalcrafts.com/'>DigitalCraft</a> to learn Node.js and Express. You can refer to all Clash Royale cards from this website.</h3>

        <h4>
            <ul style="margin-left:60px; line-height:1.5rem">
                <li>If you would like to see all cards, simply type in <code><a href='/cards/'>/cards</a></code>. </li>
                <li>You can refer to each cards by typing in <code><a href='/cards/'>/cards</a>/[number]</code> or <code><a href='/cards/'>/cards</a>/[name such as archers] </code></li>
                <li><code><a href='/troops/'>/troops</a></code> will show all troop cards.</li>
                <li><code><a href='/spells/'>/spells</a></code> will show all spell card.</li>
                <li><code><a href='/buildings/'>/buildings</a></code> will show all buildings cards. </li>
            </ul>
        </h4>
    </body>
    `

    res.send(html)
});

module.exports = router;