const Discord = require("discord.js");
const client = new Discord.Client();
const giphyCommand = require("./commands/giphyCommand.js");
const helpCommand = require("./commands/helpCommand.js");
const statsCommand = require("./commands/statsCommand.js");
const { prefix, discordToken } = require("./config-files/config.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!ax help", { type: "LISTENING" });
});

client.on("message", message => {
  let msgContent = message.content.toLowerCase();

  if (msgContent === "ping") {
    message.reply("Pong!");
  } else if (msgContent === "ding") {
    message.reply("Dong!");
  } else if (msgContent === "pito pito") {
    message.reply("gorgorito!");
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix} gif`)) {
    giphyCommand.onSearchGiphy(message);
  }

  if (message.content.startsWith(`${prefix} help`)) {
    helpCommand.onHelpMessage(message);
  }

  let statsPrefix = `${prefix} stats`;
  if (message.content.startsWith(statsPrefix)) {
    const args = message.content.slice(statsPrefix.length).split(" ");
    const options = args.filter(Boolean);

    if (options.length <= 0) return;
    statsCommand.onShowStats(message, options);
  }
});

client.login(discordToken);
