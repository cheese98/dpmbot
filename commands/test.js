var {PythonShell} = require('python-shell')

module.exports = {
    name: 'test',
    execute(client, message, args) {
        if (args.length == 0){
            args.push("--help");  // 주어진 매개변수가 없을 시 도움말로 대체
        }
        let options = {
            args : args
        }
        PythonShell.run('./maplestory_dpm_calc/test.py', options, function (err, results) {
            if (err) message.reply(err.message);
            else message.reply(`${results}`);
        });
    },
};