const fs = require('fs');
var filename = `ourFile.txt`;

fs.readFile(filename, function (error, buffer) {
    if (error) {
      console.error(error.message);
      return;
    }
    var contents = buffer.toString();
    var backwards = contents.split('').reverse().join('');
    fs.writeFile(filename, backwards, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
      console.log('File Save: ', filename);
    });
});

// // === write file
// fs.writeFile('ourFile.txt','Yall projects are awesome!', (error)=>{
//     if(error){
//         console.log(error.message);
//         return;
//     }
//     console.log(`File Saved to: ${fileName}`)
// });

// // === read file
// fs.readFile('./test.txt',(err, buffer)=>{
//     if(err){
//         console.log(err.message);
//         return;
//     }
//     console.log(`File Data:${buffer.toString}`)
// });

// === delete file
// const fs = require('fs');
// fs.unlink('./test5.js', (err)=>{
//     if(err) throw err;
//     console.log('Successfully deleted test5.js')
// });


// ======== Sample ============
// const http = require('http'); // set up servre (node module)

// var dt = new Date();
// var server = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type':'text/html'});
//     res.write("The time and date is currently"+dt.toDateString());
//     res.end(); // end connection

// });

// server.listen(3000); // something above 1000 // Ctrl + c ==> kill

// console.log("listening on port 3000")