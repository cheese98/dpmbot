var {PythonShell} = require('python-shell')
var Git = require("nodegit");
var fs = require("fs")

module.exports = {
    name : 'update',
    execute(client, message, args) {
        if (args == null || args[0] === 'repo'){
            if (!fs.existsSync("./maplestory_dpm_calc")){
                Git.Clone.clone("https://github.com/oleneyl/maplestory_dpm_calc.git", "./maplestory_dpm_calc");
            }
            Git.Repository.open("./maplestory_dpm_calc").then(function(repo) {
                repo.fetchAll({
                    credentials: function(url, userName) {
                        return Git.Cred.sshKeyFromAgent(userName);
                    }
                }).then(function() {
                    repo.mergeBranches("master", "origin/master");
                });
            })
            message.channel.send("Repository Update Finished");
        }

        if (args[0] === 'sheet'){
            let options = {
                args : args.shift()
            }
            PythonShell.run('./maplestory_dpm_calc/dpm_sheet.py', options, function (err, results) {
                if (err) throw err;
            });
            message.channel.send("Sheet Update Finished");
        }
    },
}