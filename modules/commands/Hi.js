const fs = require("fs");
module.exports.config = {
name: "Hi",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Quangei",
	description: "nguuuuu",
	commandCategory: "Hi",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("hi")==0 || (event.body.indexOf("Hi")==0)) {
		var msg = {
			body:`Chào Bạn Chúc Bạn 1 Ngày Mới Vui Vẻ❤️`,
				attachment: fs.createReadStream(__dirname + `/noprefix/hi.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
