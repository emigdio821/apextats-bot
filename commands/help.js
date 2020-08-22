const { discordClientId } = require("../config/config.json");

module.exports = {
  onHelpMessage: (message) => {
    message.channel.stopTyping();
    message.channel.send({
      embed: {
        author: {
          name: "「APEXTATS INFO」",
          icon_url: "https://i.imgur.com/ItJsTtM.png",
        },
        description:
          "**Commands** \n" +
          "**`!ax gif`** - Returns a random Apex Legends gif. \n" +
          "**`!ax news`** - Returns some news about Apex Legends. \n" +
          "**`!ax server`** - Returns info about Apex Legends servers status. \n" +
          "**`!ax stats {your_username} {platform_where_you_play}`**\n" +
          "e.g. **`!ax stats LilToadd Origin`** - Returns Apex Legends info about the given username and platform. \n\n" +
          "**Supported platforms** \n" +
          "**`Origin, XBOX, PS`**.\n\n" +
          "**ApeXtats** bot was made with :purple_heart: from :flag_mx:. \n" +
          `Wanna add this **bot** to another server? ** [Click here!](https://discordapp.com/oauth2/authorize?client_id=${discordClientId}&scope=bot&permissions=8) ** :point_left:`,
        footer: {
          icon_url:
            "https://avatars0.githubusercontent.com/u/6751108?s=460&v=4",
          text: "You can follow me on Twitter/Github | @emigdio821",
        },
      },
    });
  },
};
