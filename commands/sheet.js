module.exports = {
    name: 'sheet',
    execute(client, message, args) {
        let options = {
            args : args
        }
        message.channel.send("", { files: ["./maplestory_dpm_calc/dpm_sheet.xlsx"] });
    },
};