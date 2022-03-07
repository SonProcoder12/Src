module.exports.config = {
	name: "sotien",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "CThong",
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "Dành Cho Nhóm Chat [ Source BCT ]",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const money = (await Currencies.getData(senderID)).money;
		return api.sendMessage(`Số tiền bạn hiện đang có: ${money} Đô`, threadID);
	}
	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
		return api.sendMessage({
			body: `Số tiền của ${mentions[mention].replace("@", "")} hiện đang có là: ${money} Đô`,
			mentions: [{
				tag: mentions[mention].replace("@", ""),
				id: mention
			}]
		}, threadID, messageID);
	}
	else if (Object.keys(event.mentions).length > 0) {
		const mention = Object.keys(mentions);
		var msg = "";
		for (const value of mention) {
			var money = (await Currencies.getData(value)).money;
			if (!money) money = 0;
			msg += (` - ${mentions[value].replace("@", "")}: ${money} coin\n`);
		};
		return api.sendMessage(`Số tiền của thành viên: \n${msg}`, threadID, messageID);
	}
	else return global.utils.throwError(this.config.name, threadID, messageID);
}
