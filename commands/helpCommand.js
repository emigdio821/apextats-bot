module.exports = {
  onHelpMessage: message => {
    message.channel.send({
      embed: {
        author: {
          name: "BOT INFO",
          icon_url:
            "https://cdn3.iconfinder.com/data/icons/bold-blue-glyphs-free-samples/32/Info_Circle_Symbol_Information_Letter-512.png"
        },
        description:
          "**commands:** \n" +
          "**`!ax john/jhon/stricken`** - Returns a nice message :innocent: \n" +
          "**`!ax gif`** - Returns a random apex legends gif. \n" +
          "**`!ax stats {your_username} {platform_where_you_play}`**\n" +
          "e.g. **`!ax stats LilToadd Origin`** - Returns apex Legends info about the given username and platform. \n\n\n" +
          "Supported platforms: **Origin**, **XBOX**, **PS**. \n" +
          "**ApeXtats** bot was made with :purple_heart: from :flag_mx:.",
        footer: {
          icon_url:
            "https://avatars0.githubusercontent.com/u/6751108?s=460&v=4",
          text: "You can follow me on Twitter/Github | @emigdio821"
        }
      }
    });
  }
};