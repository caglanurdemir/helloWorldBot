// Require discord.js package
const Discord = require("discord.js");

const playCommand = require("./commands/play");

// Create a new client using the new keyword
const client = new Discord.Client();

// Clean
const arr = ["./token.json", "ready", "message", "shardReconnecting", "shardDisconnect"];

// Add a safer way to store the token (password)
const {
    prefix,
    token
} = require(arr[0]);

// Display a message when the bot comes online
client.on(arr[1], () => {
    console.log(`Logged in as ${client.user.tag}`);
})

// Reconnect Event
client.on(arr[3], () => {
    console.log(`This bot is trying to reconnect: ${client.user.tag}`);
});

// Disconnct Event
client.on(arr[4], () => {
    console.log(`This bot is now disconnect: ${client.user.tag}`);
});

// Check for new messages
client.on(arr[2], async msg => {

    // let ops = {
    //     ownerID : ownerID,
    //     active : active
    // }

    // Fail safe and msgContent is the command
    const msgContent = msg.content.split(" ")[0].toLowerCase();


    // args is the url
    let args = msg.content.split(" ").slice(1);
    console.log(args);

    // Send back a reply when the spesific command has been written by a user
    if (msgContent === "!hello") {
        msg.reply("Hi :D:DD:::D");
    }

    if (msgContent === "!help") {
        msg.reply("Just command !hello");
    }

    if (msgContent === "!play") {
        playCommand.run(client, msg, args);
    }
})


// Log in the bot using token(password)
client.login(token);