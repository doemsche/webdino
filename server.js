var webuino = require('./lib/Webdino');
var webdinoApp = webuino();

var PORT = 5000;

// function getAllProperties(obj){
//     var allProps = []
//       , curr = obj
//     do{
//         var props = Object.getOwnPropertyNames(curr)
//         props.forEach(function(prop){
//             if (allProps.indexOf(prop) === -1)
//                 allProps.push(prop)
//         })
//     }while(curr = Object.getPrototypeOf(curr))
//     return allProps
// }
 
webdinoApp.on("ready", function() {
  this.httpserver.listen(PORT, function() {
    console.log("Listening on :"+PORT+" waiting for API to be consumed")
  });
})
