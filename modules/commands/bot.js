module.exports.config = {
	name: "bot",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Tòn",//vui lòng ko thay credits tông trọng ng làm
	description: "thông tin",
	commandCategory: "thông tin", 
	usages: "thông tin bot", 
	cooldowns: 0,
	dependencies: [] 
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  }
module.exports.run = async function({ Currencies, utils, api, event, args, Users, permssion, getText }) {
  const axios = require('axios');
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  const fast = global.nodemodule["fast-speedtest-api"];
  const { commands } = global.client;
  const { events } = global.client;
  const { userName } = global.data;
  var listAdmin = global.config.ADMINBOT;
  var msgAd = [];
  let count = 0;
  for (const idAdmin of listAdmin) {
  if (parseInt(idAdmin)) {
  count++;
  var fullName = global.data.userName.get(idAdmin);
  const name = (await Users.getData(idAdmin)).name
   msgAd.push(`${count}> ${name}\n> ${idAdmin}`);
    }
  } 
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  var ngay = moment.tz("Asia/Ho_Chi_Minh").format("DD");
  var thang = moment.tz("Asia/Ho_Chi_Minh").format("MM");
  var nam = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
  const ton = await axios.get(`https://manhict.tech/thathinh`);
  var thinh = ton.data.result.data;
  const time = process.uptime(),
	hours = Math.floor(time / (60 * 60)),
	minutes = Math.floor((time % (60 * 60)) / 60),
	seconds = Math.floor(time % 60);
  const timeStart = Date.now();
  let name = await Users.getNameUser(event.senderID) 
  var link = [
"https://i.imgur.com/EBJ8rfn.jpg",
"https://i.imgur.com/d2FHLG9.jpg",
"https://i.imgur.com/JZG790u.jpg",
  ];
	var callback = () => api.sendMessage({ body: `╭───╮\n Thông Tin \n╰───╯\n───────────────────────\n>Hello ${name}\n>Tên bot: ${global.config.BOTNAME}\n>Loại bot: ${global.config.LOAIBOT}\n>Prefix: ${global.config.PREFIX}\n>commands có ${commands.size} lệnh\n>event có ${events.size} lệnh\n>Số box bạn đã ở là: ${global.data.allThreadID.length}\n>Số người dùng là: ${global.data.allUserID.length}\n>Ping: ${Date.now() - timeStart}ms\n───────────────────────\n╭───╮\n ADMIN \n╰───╯\n\n${msgAd.join("\n")}\n\n───────────────────────\n╭───╮\n Thời gian \n╰───╯\n\n>Thời gian bot hoạt động đc là: ${hours} giờ ${minutes} phút ${seconds} giây.\n>Và bây giờ là: ${gio}\n>Ngày ${ngay} Tháng ${thang} Năm ${nam}\n───────────────────────\n>[ thính ]: ${thinh}`, mentions: [{ tag: name , id: event.senderID }] ,attachment: fs.createReadStream(__dirname + "/cache/1000.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1000.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1000.jpg")).on("close",() => callback());
   }; 
      