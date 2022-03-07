//tôn trọng nhau tý đê,đã không đem đi encode rồi
module.exports.config = {
	version: "1.0.2",
	name: "help",
	hasPermssion: 0,
	credits: "Mod",//mod lại tý Drasew
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 60
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "🤖𝗟𝗲̣̂𝗻𝗵「 %1 」\n⚡𝗠𝗼̂ 𝘁𝗮̉: %2\n\n➣ 𝗖𝗮́𝗰𝗵 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴: %3\n➣ 𝗧𝗵𝘂𝗼̣̂𝗰 𝗻𝗵𝗼́𝗺: %4\n➣ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗰𝗵𝗼̛̀: %5 𝗴𝗶𝗮̂𝘆 (𝘀)\n➣ 𝗤𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻: %6\n\n◆━━Nguyễn Ngọc Sơn━━◆\n",
		"helpList": '[ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 đ𝐚𝐧𝐠 𝐜𝐨́ %1 𝐥𝐞̣̂𝐧𝐡 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭 𝐧𝐚̀𝐲, 𝐒𝐮̛̉ 𝐝𝐮̣𝐧𝐠: "%2𝐡𝐞𝐥𝐩 𝐧𝐚𝐦𝐞𝐂𝐨𝐦𝐦𝐚𝐧𝐝" đ𝐞̂̉ 𝐱𝐞𝐦 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 𝐜𝐚́𝐜𝐡 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠! ]"',
		"user": "𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴",
        "adminGroup": "𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺",
        "adminBot": "𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗕𝗼𝘁"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const fs = require("fs-extra");
	const { commands } = global.client;
	const { threadID, messageID, body } = event;
	const folderimg = __dirname + "/cache/randomimg";
	if (!fs.existsSync(folderimg)) fs.mkdir(folderimg);
	const listImg = fs.readdirSync(folderimg);
	
	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage({ body: getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), attachment: fs.createReadStream(folderimg+"/"+listImg[Math.floor(Math.random() * listImg.length)])}, threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const fs = require("fs-extra");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const folderimg = __dirname + "/cache/randomimg";
	if (!fs.existsSync(folderimg)) fs.mkdir(folderimg);
	const listImg = fs.readdirSync(folderimg);
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "◆━━𝗕𝗔̉𝗡𝗚 𝗟𝗘̣̂𝗡𝗛━━◆\n\n";
    
    for (var [name, value] of (commands)) {
      name += `: ${value.config.description}`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `➣ 𝗟𝗲̣̂𝗻𝗵 ${++i} ⚡ ${item}\n\n`;
    
    const randomText = ["A cho phép e ở mãi trong tim a đóa...❤", "E đẹp lắm a đã muốn Penhouse Đà Lạt với e, sự ngây thơ và hồn nhiên của e đã chinh phục trái tim a...", "E nhà ở đâu thế, cứ tới lui trong tim a chẳng nhớ đường về à...", "Ô tô đã có chỗ đổ, e thì đổ gục trong tim a..."];
    const text = `📖 𝗦𝗼̂́ 𝘁𝗿𝗮𝗻𝗴 ${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}\n◆━━Nguyễn Ngọc Sơn━━◆\n\n⚙️𝗖𝗮́𝗰𝗵 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴: "${prefix}help + lệnh" 𝗱𝗲̂̉ 𝗯𝗶𝗲̂́𝘁 𝘁𝗵𝗲̂𝗺 𝗰𝗵𝗶 𝘁𝗶𝗲̂́𝘁!\n🤖𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗱𝗮𝗻𝗴 𝗰𝗼́ ${arrayInfo.length} 𝗹𝗲̣̂𝗻𝗵 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝘁𝗿𝗲̂𝗻 𝗕𝗼𝘁 𝗖𝘂𝘁𝗲\n😋𝗗𝘂̀𝗻𝗴 "${prefix}help + trang" 𝗱𝗲̂̉ 𝘅𝗲𝗺 𝗹𝗲̣̂𝗻𝗵 𝘁𝘂̛̀𝗻𝗴 𝘁𝗿𝗮𝗻𝗴\n👨‍💻𝗟𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝗙𝗕 𝗔𝗱𝗺𝗶𝗻:\nhttps://www.facebook.com/hi 𝗻𝗲̂́𝘂 𝗰𝗮̂̀𝗻 𝗵𝗼̂̃ 𝘁𝗿𝗼̛̣\n⚡𝗗𝗼̣𝗰 𝗱𝗶𝗲̂̀𝘂 𝗸𝗵𝗼𝗮̉𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗕𝗼𝘁 𝗱𝗲̂̉ 𝘁𝗿𝗮́𝗻𝗵 𝗯𝗶̣ 𝗯𝗮𝗻!\n\n◆━𝗧𝗵𝗮𝗻𝗸𝘀 𝗔𝗹𝗹 𝗨𝘄𝗨━◆\n\n🥰 𝗧𝗵𝗮̉ 𝘁𝗵𝗶́𝗻𝗵 𝘁𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻:\n${randomText[Math.floor(Math.random()*randomText.length)]}`;
    return api.sendMessage({body: msg + "\n" + text, attachment: fs.createReadStream(folderimg+"/"+listImg[Math.floor(Math.random() * listImg.length)])}, threadID, async (error, info) =>{
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 99000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};