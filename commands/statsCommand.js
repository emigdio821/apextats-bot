const fetch = require("node-fetch");
const Discord = require("discord.js");
const { apexToken } = require("../config-files/config.json");

module.exports = {
  onShowStats: (message, options) => {
    if (options.length < 2) {
      let description =
        "Seems like you are missing an option, please review the available" +
        " commands by typing **`!ax help`**, remember that if you want to review your stats," +
        " it should be something like this:\n" +
        "**`!ax stats {your_username} {platform_where_you_play}`**";
      onDisplayErrorMsg(message, description);
      return;
    }

    const platform = getPlatform(options[1].toLowerCase());
    if (!platform) {
      onDisplayErrorMsg(
        message,
        "Seems like you inserted an invalid platform :thinking:"
      );
      return;
    }
    const url = `https://public-api.tracker.gg/apex/v1/standard/profile/${platform}/${options[0]}`;

    fetch(url, {
      method: "get",
      headers: { "TRN-Api-Key": apexToken }
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          onDisplayErrorMsg(message, `${json.errors[0].message} :grimacing:`);
          return;
        }
        const data = json.data;
        const stats = data.stats;
        const level = getObjByKey(stats, "Level");
        const kills = getObjByKey(stats, "Kills");
        const rankScore = getObjByKey(stats, "RankScore");
        const embed = new Discord.RichEmbed()
          .setAuthor("【 XTATS 】", data.metadata.avatarUrl)
          .setTitle(
            `${data.metadata.platformUserHandle} | ${stylePlatformStr(
              options[1]
            )} | ${data.metadata.rankName}`
          )
          .setURL(
            `https://apex.tracker.gg/apex/search?name=${options[0]}&platform=${platform}`
          )
          .setThumbnail(data.metadata.rankImage)
          // .setColor("#FC3903")
          .setDescription(
            `Seems like you are doing a great job playing **${data.children[0].metadata.legend_name}**, keep carrying your teammates (or not) :wink:. \n\n` +
              "Here you have some of your Apex Legends stats:"
          )
          .setImage(data.children[0].metadata.bgimage)
          .addField(`**${level.metadata.name}**`, level.displayValue, true)
          .addField(`**${kills.metadata.name}**`, kills.displayValue, true)
          // .addBlankField(true)
          .addField(
            `**${rankScore.metadata.name}**`,
            rankScore.displayValue,
            true
          )
          .setFooter(
            "Powered by apex.tracker.gg",
            data.children[0].metadata.icon
          )
          .setTimestamp();

        message.channel.send({ embed });
      })
      .catch(err => {
        onDisplayErrorMsg(message, err);
      });
  }
};

var getPlatform = platform => {
  let platformCode;
  if (platform === "xbox") {
    platformCode = 1;
  } else if (platform === "ps") {
    platformCode = 2;
  } else if (platform === "origin" || platform === "pc") {
    platformCode = 5;
  } else {
    return false;
  }

  return platformCode;
};

var getObjByKey = (array, key) => {
  return array.find(element => element.metadata.key === key);
};

var stylePlatformStr = platform => {
  let platformStyled;
  if (platform === "ps") {
    platformStyled = "playstation";
  } else if (platform === "origin" || platform === "pc") {
    platformStyled = "origin(pc)";
  }

  return platformStyled.toUpperCase();
};

var onDisplayErrorMsg = (message, description) => {
  return message.channel.send({
    embed: {
      author: {
        name: "【 OOPS! 】",
        icon_url:
          "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-512.png"
      },
      description: description
    }
  });
};
