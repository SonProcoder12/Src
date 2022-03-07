const fs = require("fs");
module.exports.config = {
name: "Dm",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Quangei",
	description: "nguuuuu",
	commandCategory: "Dm",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("dm")==0 || (event.body.indexOf("Dm")==0)) {
		var msg = {
			body:`Chửi con cặc`,
				attachment: fs.createReadStream(__dirname + `/noprefix/dm.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
