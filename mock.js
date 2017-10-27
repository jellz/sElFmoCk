/*
    Discord selfbot made by Jellz using Discord.js.
    This bot will mock any messages you send with
    the prefix "mock!", so if you wanted to turn
    "hello mate" into something like "hElLo mAtE",
    you would send "mock! hello mate" in Discord.

    This is imitating the popular Spongebob meme.

    [Jellz 2017]
*/




// Define the Discord client.
const Discord = require('discord.js');
const client = new Discord.Client();
// Define the config and login with the token specified.
const config = require('./config.json');
client.login(config.token);


/*
    Credit to York for this mocking function.
    https://github.com/YorkAARGH/York-Dev/blob/e53f14dd931ef09b78c362d880ea5272c90b4f87/commands/mock.js#L4
*/

const mock = function(string) {
    var chars = string.toUpperCase().split('');
    for (let i = 0; i < chars.length; i += 2) {
      let rand = Math.random();
      if (rand < 0.4) { // Slighly more chance of being upper-case
        chars[i] = chars[i].toLowerCase();
      } else {
        chars[i] = chars[i].toUpperCase();
      }
    }
    return chars.join('');
};


client.on('ready', () => {
    console.log(`sElFmoCk has been loaded, logged in to user ${client.user.tag}! Use "mock! <text>" to start mocking.`);
});

client.on('message', (msg) => {
    // Make sure the message author is not a bot.
    // if (msg.author.bot) return;
    // Make sure the message author is the user using this bot (you).
    if (msg.author.id !== client.user.id) return;
    // Make sure they're intentionally mocking.
    if (!msg.content.toLowerCase().startsWith('mock!')) return;
    // Checks if they have provided any content.
    if (msg.content.toLowerCase().replace(" ", "") === "mock!") return msg.edit('You need to provide some text!\n**Usage:** mock! hello buddy');
    // Edit the message with the mocked version.
    const message = msg.content.split(' ').splice(1).join(' ');
    msg.edit(mock(message));
    console.log(`Successfully mocked: ${mock(message)}\nOriginal message: ${message}\nMessage ID: ${msg.id}`);


});
