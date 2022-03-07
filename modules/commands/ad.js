module.exports.config = {
    name: "ad",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Tú",
    description: "Thông tin về admin",
    commandCategory: "Ad",
    usages: "ad",
    cooldowns: 5,
    dependencies: {
      "request": ""
    }
};

module.exports.run = ({ api, event, args }) => {
    const request = require("request");
    if (!args[0] || typeof parseInt(args[0]) !== "number") return api.sendMessage(`❏ 𝐂𝐇À𝐎 𝐍𝐇Ữ𝐍𝐆 𝐍𝐆ƯỜ𝐈 𝐒Ử 𝐃Ụ𝐍𝐆 𝐁𝐎𝐓 ❐\n✏️Thông Tin Về Admin Bot 1 ✏️\n𝗔𝗗𝗠𝗜𝗡 𝗡𝗔𝗠𝗘 :Nguyễn Ngọc Sơn \n𝑩𝒊𝒆̣̂𝒕 𝒅𝒂𝒏𝒉 : Magic\n𝑮𝒊𝒐̛́𝒊 𝒕𝒉𝒊𝒆̣̂𝒖 : 1 nguoi binh thuong\nThông Tin Cá Nhân\n𝗧𝗶́𝗻𝗵 𝗰𝗮́𝗰𝗵 : 𝑻𝒊𝒏𝒉 𝒀𝒆𝒖 𝑳𝒂 𝒈𝒊 🌸\n𝗖𝗵𝗶𝗲̂̀𝘂 𝗰𝗮𝗼 : 🌸\n𝑳𝒊𝒆̂𝒏 𝑯𝒆̣̂ :0856098006\nQuê Quán : Hà Nam\nNơi Sống : Hà Nam\nMối quan hệ : có cái nịt  \n𝐋𝐢𝐧𝐤 𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐚𝐝𝐦𝐢𝐧 : https://www.facebook.com/...\n✏️Thông Tin Về Admin Bot 2 ✏️\n𝗔𝗗𝗠𝗜𝗡 𝗡𝗔𝗠𝗘 :Lê Nguyễn Minh Phương \n𝑩𝒊𝒆̣̂𝒕 𝒅𝒂𝒏𝒉 : Mphuongw Nèee\n𝑮𝒊𝒐̛́𝒊 𝒕𝒉𝒊𝒆̣̂𝒖 : youngboiz si tình\nThông Tin Cá Nhân\n𝗧𝗶́𝗻𝗵 𝗰𝗮́𝗰𝗵 :Vui vẻ , hoà đồng , thân thiện , gần gũi 🌸\n𝗖𝗵𝗶𝗲̂̀𝘂 𝗰𝗮𝗼 : 172 cm 🌸\n𝑳𝒊𝒆̂𝒏 𝑯𝒆̣̂ :0985921850\nQuê Quán : Bình Thuận\nNơi Sống : Biên Hoà\nMối quan hệ : Độc thân vui tính  \n𝐋𝐢𝐧𝐤 𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐚𝐝𝐦𝐢𝐧 : https://www.facebook.com/LeNguyenMinhPhuong.Media\n𝑽𝒂̀𝒊 𝒍𝒐̛̀𝒊 𝒕𝒐̛́𝒊 𝒃𝒂̣𝒏 𝒅𝒖̀𝒏𝒈 : Vui lòng không spam khi sử dụng và trân thành cảm ơn bạn đã sử dụng bot\n𝙇𝙪̛𝙪 𝙮́ : Đừng có dại dột mà add 2 bot kẻo bị phát hiện là sẽ bị band box\n𝑪𝒂̉𝒏𝒉 𝒃𝒂́𝒐 : Vui lòng không dùng bot với mục đích xấu hay cố ý report acc facebook\nChúc bạn sử dụng vui vẻ <3`, event.threadID, event.messageID);
    return request(`https://nhentai.net/api/gallery/${parseInt(args[0])}`, (error, response, body) => {
        var codeData = JSON.parse(body);
        if (codeData.error === true) return api.sendMessage(getText('cantFindHentai'), threadID, messageID);
        const title = codeData.title.pretty;
        var tagList = [],
            artistList = [],
            characterList = [];
        codeData.tags.forEach(item => (item.type == "tag") ? tagList.push(item.name) : (item.type == "artist") ? artistList.push(item.name) : (item.type == "character") ? characterList.push(item.name) : '');
        var tags = tagList.join(', ');
        var artists = artistList.join(', ');
        var characters = characterList.join(', ');
        if (characters === '') characters = 'Original';
        api.sendMessage(`» Tên: ${title}\n» Tác giả: ${artists}\n» Nhân vật: ${characters}\n» Tags: ${tags}\n» Liên kết: https://nhentai.net/g/${args[0]}`, event.threadID, event.messageID);
    });
}
