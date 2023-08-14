const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"], partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "USER"] });
const fs = require("fs");
const ayarlar = require("./config.json");

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Aktif!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.login('Token')
