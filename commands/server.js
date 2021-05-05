const axios = require("axios");
const Discord = require("discord.js");
const errHandler = require("../handlers/error.js");
const { mozambiqueToken } = require("../config/config.json");

module.exports = {
  onShowServerStatus: (message) => {
    const url = `https://api.mozambiquehe.re/servers?auth=${mozambiqueToken}`;

    axios
      .get(url)
      .then((response) => {
        const embed = new Discord.RichEmbed()
          .setAuthor(
            "「SERVERS STATUS」",
            "https://cdn2.iconfinder.com/data/icons/small-color-v5/512/data_hosting_server_storage_tower-512.png"
          )
          .setTitle("Apex Legends servers status")
          .setDescription(
            "Please note that some of the data displayed may be wrong or out of date. \n\n:white_check_mark: = **Up**\n:fire: = **Slow**\n:no_entry_sign: = **Down**"
          )
          .setThumbnail("https://i.imgur.com/MjopzpW.png")
          .setImage("https://i.imgur.com/AEVfPxQ.png")
          .setFooter(
            "Powered by mozambiquehe.re",
            "https://mozambiquehe.re/assets/layout/apexlogo.png"
          )
          .setTimestamp();

        let entries = Object.entries(response.data);
        entries.pop();
        for (let i = 0; i < entries.length; i++) {
          embed.addField(
            entries[i][0],
            formatServer(Object.entries(entries[i][1])),
            true
          );
        }

        message.channel.send({ embed });
      })
      .catch((error) => {
        console.log(error);
        errHandler.onDisplayErrorMsg(
          message,
          "Something went wrong, try again."
        );
      })
      .then(() => {
        message.channel.stopTyping();
      });
  },
};

var formatServer = (data) => {
  let serverString = "";
  data.forEach(function (item) {
    serverString +=
      formatSouthAmerica(item[0]) +
      " " +
      `${getServerStatusIcon(item[1].Status)} \n`;
  });

  return serverString;
};

var formatSouthAmerica = (string) => {
  if (string === "SouthAmerica") {
    string = "S-America";
  }

  return string;
};

var getServerStatusIcon = (status) => {
  let icon = ":fire:";
  if (status === "UP") {
    icon = ":white_check_mark:";
  } else if (status === "DOWN") {
    icon = ":no_entry_sign:";
  } else if (status === "NO DATA") {
    icon = ":question:";
  }

  return icon;
};
