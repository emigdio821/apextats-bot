const GphApiClient = require("giphy-js-sdk-core");
const { giphyToken } = require("../config/config.json");
const giphy = GphApiClient(giphyToken);

module.exports = {
  onSearchGiphy: message => {
    giphy
      .search("gifs", { "q": "apex-legends", "limit": 30 })
      .then(response => {
        let gifLength = response.data.length;
        let randomGif = response.data[Math.floor(Math.random() * gifLength)];

        message.channel.stopTyping();
        message.channel.send({
          embed: {
            description: "GIF found! - beep boop :wrench: :robot:",
            files: [randomGif.images.fixed_height.url]
          }
        });
      })
      .catch(() => {
        message.channel.stopTyping();
        message.channel.send({
          embed: {
            description: "Oops! something went wrong, try again :cry:"
          }
        });
      });
  }
};
