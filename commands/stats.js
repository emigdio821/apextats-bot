const axios = require("axios");
const Discord = require("discord.js");
const { apexToken } = require("../config/config.json");
const errHandler = require("../handlers/error.js");

module.exports = {
  onShowStats: (message, options) => {
    if (options.length < 2 || options.length > 2) {
      let description =
        "Seems like you are using invalid command options, please review the available" +
        " commands by typing **`!ax help`**.\n\n" +
        "Remember that if you want to review your stats, it should be something like this:\n" +
        "**`!ax stats {your_username} {platform_where_you_play}`**";
      errHandler.onDisplayErrorMsg(
        message,
        description,
        "https://i.imgur.com/8mUK8Vt.png"
      );
      return;
    }

    const platformStr = options.pop();
    const platform = getPlatform(platformStr.toLowerCase());
    const user = options.join(" ");
    const url = `https://public-api.tracker.gg/apex/v1/standard/profile/${platform}/${formatParamSpace(
      user
    )}/`;

    if (!platform) {
      errHandler.onDisplayErrorMsg(
        message,
        "Hmm, seems like you inserted an invalid platform.",
        "https://i.imgur.com/8mUK8Vt.png"
      );
      return;
    }

    axios
      .get(url, {
        headers: { "TRN-Api-Key": apexToken },
      })
      .then((response) => {
        const data = response.data.data;
        const stats = data.stats;
        const level = getObjByKey(stats, "Level");
        const kills = getObjByKey(stats, "Kills");
        const rankScore = getObjByKey(stats, "RankScore");
        const embed = new Discord.RichEmbed()
          .setAuthor("「XTATS」", data.metadata.avatarUrl)
          .setTitle(onSetTitle(data, platformStr))
          .setURL(
            `https://apex.tracker.gg/apex/search?name=${formatParamSpace(
              user
            )}&platform=${platform}`
          )
          .setThumbnail(data.metadata.rankImage)
          .setDescription(
            `Seems like you are currently playing **${data.children[0].metadata.legend_name}**, keep carrying your teammates (or not) :wink:. \n\n` +
              "Here you have some of your Apex Legends stats:"
          )
          .setImage(data.children[0].metadata.bgimage)
          .setFooter(
            "Powered by apex.tracker.gg",
            data.children[0].metadata.icon
          )
          .setTimestamp();

        if (level)
          embed.addField(
            `**${level.metadata.name}**`,
            level.displayValue,
            true
          );
        if (kills)
          embed.addField(
            `**${kills.metadata.name}**`,
            kills.displayValue,
            true
          );
        if (rankScore)
          embed.addField(
            `**${rankScore.metadata.name}**`,
            rankScore.displayValue,
            true
          );

        message.channel.send({ embed });
      })
      .catch((error) => {
        errHandler.onDisplayErrorMsg(
          message,
          `${error.response.data.errors[0].message}`
        );
      })
      .then(() => {
        message.channel.stopTyping();
      });
  },
};

var onSetTitle = (data, platformStr) => {
  let title = `${data.metadata.platformUserHandle} | ${stylePlatformStr(
    platformStr
  )} | ${data.metadata.rankName}`;

  if (data.metadata.countryCode) {
    title = title + ` | ${data.metadata.countryCode}`;
  }

  return title.toUpperCase();
};

var getPlatform = (platform) => {
  let platformCode;
  if (platform === "xbox") {
    platformCode = 1;
  } else if (platform === "ps" || platform === "psn") {
    platformCode = 2;
  } else if (platform === "origin" || platform === "pc") {
    platformCode = 5;
  } else {
    return false;
  }

  return platformCode;
};

var getObjByKey = (array, key) => {
  return array.find((element) => element.metadata.key === key);
};

var stylePlatformStr = (platform) => {
  let platformStyled = platform;
  if (platform === "ps" || platform === "psn") {
    platformStyled = "psn";
  } else if (platform === "origin" || platform === "pc") {
    platformStyled = "origin-pc";
  }

  return platformStyled;
};

var formatParamSpace = (str) => {
  return str.replace(/ /g, "%20");
};