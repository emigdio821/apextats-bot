const axios = require("axios");
const Discord = require("discord.js");
const { mozambiqueToken } = require("../config/config.json");
const utils = require("../handlers/error.js");

module.exports = {
  onShowNews: (message) => {
    const url = `https://api.mozambiquehe.re/news?lang=en-us&auth=${mozambiqueToken}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        for (let i = 0; i < 2; i++) {
          const embed = new Discord.RichEmbed()
            .setAuthor("「APEX NEWS」", "https://i.imgur.com/njnTQbj.png")
            .setTitle(data[i].title)
            .setURL(data[i].link)
            .setDescription(
              `${data[i].short_desc} \n\n` +
                "Click the **title** for more info."
            )
            .setImage(data[i].img)
            .setFooter("Powered by mozambiquehe.re")
            .setTimestamp();

          message.channel.send({ embed });
        }
      })
      .catch((error) => {
        console.log(error);
        utils.onDisplayErrorMsg(
          message,
          "Oops! something went wrong, try again."
        );
      })
      .then(() => {
        message.channel.stopTyping();
      });
  },
};
