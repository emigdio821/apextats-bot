const Discord = require("discord.js");
const GphApiClient = require("giphy-js-sdk-core");
const { prefix, discordToken, giphyToken } = require("./config.json");
const client = new Discord.Client();
const giphy = GphApiClient(giphyToken);
const colorBox = 3447003;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  // console.log(msg.content);
  // if (msg.author.bot) return;
  // if (msg.content.indexOf(prefix) !== 0) return;
  let msgContent = msg.content.toLowerCase();

  if (msg.content.startsWith(`${prefix} gif`)) {
    onGifCommand(msg);
  }

  if (msg.content.startsWith(`${prefix} help`)) {
    onHelpCommand(msg);
  }

  handleMsg(msgContent, msg);
});

client.login(discordToken);

function handleMsg(msgContent, msg) {
  if (msgContent === "ping") {
    msg.reply("Pong!");
  } else if (msgContent === "ding") {
    msg.reply("Dong!");
  } else if (msgContent === "pito pito") {
    msg.reply("gorgorito!");
  } else if (
    msgContent === "john" ||
    msgContent === "jhon" ||
    msgContent === "stricken"
  ) {
    msg.channel.send({
      embed: {
        color: colorBox,
        description: "Jonathan A.K.A. ThestralMG es el más joto del server." + " :eyes:"
      }
    });
  }
}

function onGifCommand(msg) {
  giphy
    .search("gifs", { q: "apex legends" })
    .then(response => {
      let gifLength = response.data.length;
      let gifIdx = Math.floor(Math.random() * 10 + 1) % gifLength;
      let pickedGif = response.data[gifIdx];

      msg.channel.send("Here you have it my nigga :wink:", {
        files: [pickedGif.images.fixed_height.url]
      });
    })
    .catch(() => {
      msg.channel.send("Oops! something went wrong :cry:");
    });
}

function onHelpCommand(msg) {
  msg.channel.send({
    embed: {
      color: colorBox,
      description:
        "**!ax help** - To display available commands \n" +
        "**!ax gif** - To display a random apex legends gif. \n" +
        "**!ax john/jhon/stricken** - To display a nice message :innocent: (work in progress)" +
        "."
    }
  });
}
