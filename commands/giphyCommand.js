const GphApiClient = require("giphy-js-sdk-core");
const { giphyToken } = require("../config-files/config.json");
const giphy = GphApiClient(giphyToken);

module.exports = {
  onSearchGiphy: message => {
    giphy
      .search("gifs", { "q": "apex legends" })
      .then(response => {
        let gifLength = response.data.length;
        let gifIdx = Math.floor(Math.random() * 10 + 1) % gifLength;
        let pickedGif = response.data[gifIdx];

        message.channel.send({
          embed: {
            description: "GIF found! - beep boop :wrench: :robot:",
            files: [pickedGif.images.fixed_height.url]
          }
        });
      })
      .catch(() => {
        message.channel.send({
          embed: {
            description: "Oops! something went wrong, try again :cry:"
          }
        });
      });
  }
};
