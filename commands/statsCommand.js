const Discord = require("discord.js");

module.exports = {
  onShowStats: (message, options) => {
    if (options.length < 2) {
      message.channel.send({
        embed: {
          author: {
            name: "OOPS!",
            icon_url: "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-512.png"
          },
          description:
            "Seems like you are missing an option, please review the available" +
            " commands by typing **`!ax help`**, remember that if you want to review your stats," +
            " it should be something like this:\n" +
            "**`!ax stats {your_username} {platform_where_you_play}`**"
        }
      });

      return;
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(
        "Xtats Bot",
        "https://secure.download.dm.origin.com/production/avatar/prod/userAvatar/27625359/208x208.JPEG"
      )
      .setTitle("LilToadd @PC/Origin")
      .setURL("https://github.com/emigdio821")
      .setThumbnail(
        "https://trackercdn.com/cdn/apex.tracker.gg/legends/lifeline-tile.png"
      )
      // .setColor("#FC3903")
      .setDescription(
        "Seems like you are doing a great job playing **Lifeline**, keep carrying your teammates (jk) :wink:. \n\n" +
          "Here you have some of your Apex Legends stats:"
      )
      .setImage(
        "https://trackercdn.com/cdn/apex.tracker.gg/legends/lifeline-concept-bg-small.jpg"
      )
      .addField("**Kills**", "3492", true)
      // .addBlankField(true)
      .addField("**Deaths**", "234", true)
      .addField("**Assists**", "3452", true)
      .setFooter("Powered by apex.tracker.gg")
      .setTimestamp();

    message.channel.send({ embed });
  }
};
