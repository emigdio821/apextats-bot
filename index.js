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
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix} gif`)) {
    message.channel.startTyping();
    setTimeout(() => {
      giphyCommand.onSearchGiphy(message);
    }, 500);
  }

  if (message.content.startsWith(`${prefix} help`)) {
    message.channel.startTyping();
    setTimeout(() => {
      helpCommand.onHelpMessage(message);
    }, 1000);
  }

  let statsPrefix = `${prefix} stats`;
  if (message.content.startsWith(statsPrefix)) {
    message.channel.startTyping();
    const args = message.content.slice(statsPrefix.length).split(" ");
    const options = args.filter(Boolean);

    if (options.length <= 0) return;
    setTimeout(() => {
      statsCommand.onShowStats(message, options);
    }, 500);
  }
});

client.login(discordToken);
