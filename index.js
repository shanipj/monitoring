const cron = require("node-cron");
let shell = require("shelljs");


cron.schedule("* */15 * * * *", function(){
    console.log("Scheduler is running");
    if(shell.exec("node app.js ").code !== 0){
        console.log("something went wrong");
    }
});
