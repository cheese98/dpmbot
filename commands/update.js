var {PythonShell} = require('python-shell')
var Git = require("nodegit");
var fs = require("fs");
const { resolve } = require('path');

module.exports = {
    name : 'update',
    execute(client, message, args) {
        if(args.length == 0){
            message.reply("!update repo: update repository\n!update sheet: update DPM sheet")
        }

        if (args[0] === 'repo'){
            if (fs.existsSync("./maplestory_dpm_calc")){
                console.log("Delete existing repository...")
                fs.rmdirSync("./maplestory_dpm_calc", { recursive: true });
            }

            console.log("Cloning the repository...");
            Git.Clone.clone("https://github.com/oleneyl/maplestory_dpm_calc.git", "./maplestory_dpm_calc");
            console.log("Repository Update Finished!");
        }

        if (args[0] === 'sheet'){
            let options = {
                args : args.shift()
            }
            PythonShell.run('./maplestory_dpm_calc/dpm_sheet.py', options, function (err, results) {
                if (err) throw err;
            });
            console.log("Sheet Update Finished");
        }
    },
}