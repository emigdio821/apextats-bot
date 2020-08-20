module.exports = {
  onDisplayErrorMsg: (message, description) => {
    message.channel.stopTyping();
    return message.channel.send({
      embed: {
        author: {
          name: "「OOPS!」",
          icon_url:
            "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-512.png"
        },
        description: description
      }
    });
  }
};
