var {PythonShell} = require('python-shell')

module.exports = {
    name: 'test',
    execute(client, message, args) {
        let options = {
            args : args
        }
        PythonShell.run('./maplestory_dpm_calc/test.py', options, function (err, results) {
            if (err) throw err;
            message.reply(`${results}`);
        });
    },
};