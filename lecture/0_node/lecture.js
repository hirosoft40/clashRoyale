class Person{
    constructor(name){
        this.name = name;
    }
    Greeting(){
        console.log(`Hello ${this.name}`)
    }
}
module.exports = Person;

// //======
// var friends = ['Hiroko','Sam','Jean', "Rigo"];
// friends.forEach((eachName, index) => {
//     console.log(`${index +1}. ${eachName}`);
// });

// //======
// function add(x,y, printFun){
//     var result = x+y;
//     printFun(result);
// }

// function print(result){
//     console.log(result)
// };

// add(3,56, print);

// // when importing file, use "module export" at the end of the module file.
// // when importing , put import at the top of the file

// var log = {
//     info: info => console.log(`Info: ${info}`),
//     warning: warning => console.log(`warning: ${warning}`),
//     error: error => console.log(`Error: ${error}`)
// }

// log.info("some info");
// log.warning("this is warning");
// log.error("this is error")

// var msg = 'Hello World'
// var SimpleMessage = 'This is Simple message'

// module.exports = msg;  //
// module.exprots.SimpleMessage ='Hello World';
// module.exports = function(msg){
//     console.log(msg)
// }
