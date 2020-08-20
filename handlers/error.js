module.exports = {
  onDisplayErrorMsg: (message, description, icon) => {
    message.channel.stopTyping();
    icon = icon || "https://i.imgur.com/OptuDsv.png";
    return message.channel.send({
      embed: {
        author: {
          name: "「OOPS!」",
          icon_url: icon,
        },
        description: description,
      },
    });
  },
};
