const fs = require("fs");
module.exports.config = {
name: "Pp",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Quangei",
	description: "nguuuuu",
	commandCategory: "Pp",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("pp")==0 || (event.body.indexOf("Pp")==0)) {
		var msg = {
			body:`Theo lời admin tao nói ❤️❤️❤️`,
				attachment: fs.createReadStream(__dirname + `/noprefix/pp.png`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
