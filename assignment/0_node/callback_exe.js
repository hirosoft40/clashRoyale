// // // ==== hw1 
// // const add = (x,y) => console.log(x+y);
// // setTimeout(add,1000,1,2)

// // const subtract = (x,y)=>console.log(x-y);
// // setTimeout(subtract, 2000, 5,4)

// // const greeting = person => console.log(`Hola, ${person}!`);
// // setTimeout(greeting, 3000, 'Hiroko')

// // const product = numbers => {
// //     return console.log(numbers.reduce((a,b)=>{return a*b},1))
// // }
// //console.log(product([1,2,3]))
// // setTimeout(product, 4000,[2,3,4])


// class Person{
//     constructor(name){
//         this.name = name;
//     }
//     greeting(yourName){
//         console.log(`Hola, ${yourName}`)
//     }
//     product(numbers){
//         return console.log(numbers.reduce((a,b)=>{return a*b},1))
//     }
// }
// var hiroko = new Person('Hiroko');
// // hiroko.greeting();
// setTimeout(hiroko.greeting,1000,"Hiroko")
// setTimeout(hiroko.product,2000,[2,3,4])


// // //==== hw2
// const fs = require('fs');
// // const prompt = require('prompt-promise')
// var fileName = 'file1.txt';  // (1)
// // var fileName = 'file.txt';  // (2)

// fs.readFile(fileName, function(err, buf){
//     if(err){
//         console.error(err.message);
//         return;
//     }
//     let contents = buf.toString();
//     let capitalize = contents.toUpperCase();
//     fs.writeFile(fileName, capitalize, function(err){
//         if (err){
//             console.error(err.message);
//             return;
//         }
//         console.log('File Save: ', fileName)
//     });
// });

// // === DNS lookup  https://nodejs.org/api/dns.html#dns_dns
// const dns = require('dns');
// let site = 'yahoo.com'
// var lookup = dns.lookup(site, (err, address)=>{
//     console.log(`address: ${address}`)
// })

// === Read and write
const prompt = require('prompt-promise');
const fs = require('fs');
var res = ''

prompt('input: ')
.then((input)=>{
    let inputFile = input;
    fs.readFile(inputFile, (err, buf)=>{
        if(err)return console.error(err.message);
        let contents = buf.toString();
        res = contents.toUpperCase();
        });
    return prompt('output: ')
    })
.then(output => {
    let outputFile = output;
    fs.writeFile(outputFile, res, err=>{
        if(err) return console.error(err.message);
        console.log(`Wrote to file ${outputFile}`);
        console.log(`As a result, ${outputFile} should now contain the text ${res}`)
        prompt.done();
        })
    })
.catch(function rejected(err){
    console.log('error:', err.stack);
    prompt.finish();
})

// === save web page  https://nodejs.org/docs/v0.4.7/api/all.html#http.get
ß
