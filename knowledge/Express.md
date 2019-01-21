What is URL?
Uniform Resource Locator.

[SAMPLE] 
http://www.example.com:80/path/to/myFile.html?key1=value1&key2=value2#SomewhereInTheDocument
<---domain name -----><port><-----path------><--- extra parameters---><--anchor to another path of the resources itself -->
www.example.com // is the domain name that indicates which web server is being requested.

:80  // :80 is the port. If the web server uses the standard ports of the HTTP protocol(80 for HTTP and 443 for HTTPS) to grant access to its resources. Otherwise it is mandatory.

/path/to/myFile.html // after/path is the path to the resource on the web server. In the early days of the web, a path like this represented a physical file location on the web server. Nowadays, it is mostly an abstraction handled by web servers without any physical reality.

?key1=value1&key2=value2 // are extra parameters provided to the web server. list of key/value pairs separated with the & symbols. The web server can use those parameters to do extra stuff before returning the resources.
Each web server has own rule as to  handling parameters which we know only by asking the web server owner.

#SomewhereInTheDocument // is an anchor to another part of the resource itself.
Kind of like 'bookmark' inside the resource, giving the browser the directions to show the content located at that 'bookmarked' spot. On an HTML document, for example, the broqser will scroll to the point where the anchor is defined. on a video or audio document, the browser will try to go to the time the anchor represents.
the part after the #(aka fragment identifier) is never sent to the server with the request, so worth nothing.

What is NPM?
npm is a website that has whole bunch of people built

What is express?
Fast, unopinionated, minimalist web framework for Node.js

package.json
npm init will add this file which lists all the dependencies that the project needs

How to install
(1) npm init
(2) npm install express --save
When working on git, npm will refer to info stored in package.json and check dependency. So to avoid duplication.
(3) require
const express = require('express');
this will include a module 

(4) public folder
app.use(express.static('public'))
This says I am middleware and public folder which holds static data, such as img, styles folders, this folder is applied to all routes underneath this statement.

Handler functions (ROUTE)
|- can be chained together
|- can expect to receive a third arg (next)
|- should call next to move to the next handler or call res.end
|- can make change to the Request or the Response



(1) .get()
route get requests to the specified path with the specified callback functions.
  |- A string representing a path
  |- A path pattern
  |- A regular expression pattern to match paths.
  |- An array of combinations of any of the above.

app.get('/hello',(req, res)=>{
    var name = req.query.name || 'World';
    res.send('Hello '+name);
})

(2). send()
sends the HTTP response. Good for simple non-streaming responses: it automatically assigns the content-length HTTP response header field(unless previously defined) and provides automatic HEAD and HTTP cache freshness support.

app.get('/shoes?/?',(req, res)=>{
    res.send('i need new shoes')  
});

(3). listen()
Binds and listens for connections on the specified host and port. Same with Node.js's http.Server.listen()
If port is ommitted or 0, then the operating system will assign an arbitray unused port.
// port number needs to be above 1200
app.listen(3500, ()=>{ // callback
    console.log(`listening on port 3500`)
});

(4). next()
next allows to chain on another functions

app.get('/', (req, res, next)=>{
    req.message = 'hello';
    next(); // next allows to chain on another function
}, 
(req, res, next) => {
    req.message += 'there';
    next();
});

(5) .sendFile()
Transferes the file at the given path
app.get('/', (req, res)=>{
    res.sendFile('myFile.html', {root: __dirname});
});

<h2>DYNAMIC website</h2>


Literal Matching
Matches whose string exactly matches, but we can make use of regular expression
to match the url such as to put backslash at the end of URL or 
<h2> HTTP REQUEST AND RESPONSE </h2>
https://www.quora.com/Why-do-I-see-function-req-res-all-over-Node-and-Express-apps
(req, res)=>{}
(1) request
The req object contains a whole bunch of data about the request, such as parameters, queries, returned data from a form, cookies and more.

(2) response
The res object is the response sent back to client, this might take the form of res.send, res.render, or 

(3) send, redirect, render
res.send('hello') // res.send sends a simple response such as string to the client app.get.
res.redirect('/') // res.redirect redirects the client
res.render('/index',{obj:objToBeParsedIntoTemplate}) // res.render sends a response rendered into a template

nodemon

reload
