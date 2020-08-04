const ytdl = require("ytdl-core");

exports.run = async (client, msg, args, ops) => {
    console.log("You are here");
    

    if (!args[0]) {
        return msg.channel.send("Please give me a url");
    }

    if (!msg.member.voice.channel) {
        return msg.channel.send("You have to be in a voice channel"); 
    }

    let info = await ytdl.getInfo(args[0]) || {};


    let data = ops.active.get(msg.guild.id) || {};
    console.log(`data : ${data}`);

    ops.active.set(msg.guild.id, data);

    // if (!data.connection) {
    //     // let channel = msg.member.voiceChannel;
    //     // data.connection = await channel.join();
    //     data.connection = await msg.member.voice.channel.join();
    //     console.log(`Here is the data conection : ${data.connection}`);
    // }

    if (!msg.guild.voice.connection) msg.member.voice.channel.join().then(function (connection) {
        play(client, ops, data, connection);
    })


    if (!data.queue) {
        data.queue = [];
    }

    data.guildID = msg.guild.id;
    data.queue.push({
        songName : info.videoDetails.title,
        requester : msg.author.tag,
        url : args[0],
        announceChannel : msg.channel.id
    });

    // if (!data.dispatcher) {
    //     play(client, ops, data, connection);
    // }else {
    //     msg.channel.send(`Added to the queue : ${info.title} | Requested by : ${msg.author.tag}`);
    // }

    console.log(data.queue);

    let validatedURL = await ytdl.validateURL(args[0]) || null;

    if (!validatedURL) {
        return msg.channel.send("Please give me a url");
    }

    

    // return msg.channel.send(`Here is the song for you : ${info.videoDetails.title}`);
}

async function play(client, ops, data, connection) {

    // var server = servers[msg.guild.id];

    // server.dispatch
    console.log("WE ARE IN THE PLAY FUNC BRROOO");

    client.channels.cache.get(data.queue[0].announceChannel).send(`Now playing : ${data.queue[0].songName}`);

    data.dispatcher = await connection.playStream(ytdl(data.queue[0].url, {filter : 'audioonly'}));
    data.dispatcher.setVolume(5/100);
    
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        console.log("bitirme");
    })

}