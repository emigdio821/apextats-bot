const Discord = require("discord.js");
const client = new Discord.Client();
const commandHandler = require("./util/commandHandler.js");
const { discordToken } = require("./config-files/config.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!ax help", { type: "LISTENING" });
});

client.on("message", message => {
  commandHandler.onHandleMessage(message);
});

client.login(discordToken);
