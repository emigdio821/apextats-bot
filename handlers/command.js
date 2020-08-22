const giphyCommand = require("../commands/giphy.js");
const helpCommand = require("../commands/help.js");
const statsCommand = require("../commands/stats.js");
const newsCommand = require("../commands/news.js");
const serverCommand = require("../commands/server.js");
const { prefix } = require("../config/config.json");

module.exports = {
  onHandleMessage: (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(`${prefix} gif`)) {
      message.channel.startTyping();
      setTimeout(() => {
        giphyCommand.onSearchGiphy(message);
      }, 200);
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

      setTimeout(() => {
        statsCommand.onShowStats(message, options);
      }, 200);
    }

    if (message.content.startsWith(`${prefix} news`)) {
      message.channel.startTyping();
      setTimeout(() => {
        newsCommand.onShowNews(message);
      }, 200);
    }

    if (message.content.startsWith(`${prefix} server`)) {
      message.channel.startTyping();
      setTimeout(() => {
        serverCommand.onShowServerStatus(message);
      }, 200);
    }
  },
};
