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

  //to be removed :P
  const isValidJohnStr =
    message.content.startsWith(`${prefix} john`) ||
    message.content.startsWith(`${prefix} jhon`) ||
    message.content.startsWith(`${prefix} stricken`);
  if (isValidJohnStr) {
    handleMsg(msgContent, message);
  }
  //

  let statsPrefix = `${prefix} stats`;
  if (message.content.startsWith(statsPrefix)) {
    const args = message.content.slice(statsPrefix.length).split(" ");
    const options = args.filter(Boolean);

    if (options.length <= 0) return;
    statsCommand.onShowStats(message, options);
  }
});

client.login(discordToken);

function handleMsg(msgContent, msg) {
  let msgNoPrefix = msgContent.replace(prefix, "").trim();
  if (
    msgNoPrefix == "john" ||
    msgNoPrefix == "jhon" ||
    msgNoPrefix == "stricken"
  ) {
    msg.channel.send({
      embed: {
        description:
          "Jonathan A.K.A. **ThestralMG** es el más joto del server." +
          " :eyes:"
      }
    });
  }
}
