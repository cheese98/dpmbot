const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const cooltime = new Set()
const prefix = '!'

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

try {
	const token = require("./token.json");
	client.login(token.token);
} catch (e) {
	if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
		client.login(process.env.TOKEN);
	}
    else throw e;
}


