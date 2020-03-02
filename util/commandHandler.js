const giphyCommand = require("../commands/giphyCommand.js");
const helpCommand = require("../commands/helpCommand.js");
const statsCommand = require("../commands/statsCommand.js");
const newsCommand = require("../commands/newsCommand.js");
const { prefix } = require("../config-files/config.json");

module.exports = {
  onHandleMessage: message => {
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

    if (message.content.startsWith(`${prefix} news`)) {
      message.channel.startTyping();
      setTimeout(() => {
        newsCommand.onShowNews(message);
      }, 500);
    }
  }
};
