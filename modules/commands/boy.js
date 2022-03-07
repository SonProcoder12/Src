module.exports.config = {
  name: "boy",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "Nhật UwU",
  description: "Random ảnh có phí",
  commandCategory: "random-img",
  usages: "",
  cooldowns: 3
};

module.exports.run = async ({ api, event, Currencies }) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
    axios.get('https://api.vinhbeat.ga/trai.php').then(res => {
    var callback = function () {
          api.sendMessage({
            body : `《 Gì Trai nè ngắm đi 》\n➢ Bạn đã bị -1000🚷`,
            attachment: fs.createReadStream(__dirname + '/cache/boy.jpg')
          }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/boy.jpg'), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/boy.jpg')).on("close", callback).then(Currencies.setData(event.senderID, options = {money: money - 1000}));
      })
  } else return api.sendMessage("Bạn cần 1000 đô để xem ảnh ?",event.threadID,event.messageID);
}