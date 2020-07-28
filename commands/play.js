const ytdl = require("ytdl-core");

exports.run = async (client, msg, args) => {
    console.log("You are here");
    console.log(args[0]);

    if (!args[0]) {
        return msg.channel.send("Please give me a url");
    }

    // if (!msg.member.voiceChannel) {
    //     return msg.channel.send("You have to be in a voice channel"); 
    // }

    if (args) {
        let validatedURL = await ytdl.validateURL(args[0]);
        console.log(validatedURL);
        return msg.channel.send(`Here is the song for you ${args}`);
    }
}