const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const colors = require('colors');

require('dotenv').config();

client.on('ready', (client) => {
  try {
    const stringlength = 69;
    console.log('\n');
    console.log(
      `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
        .bold.brightGreen
    );
    console.log(
      `     ┃ `.bold.brightGreen +
        ' '.repeat(-1 + stringlength - ` ┃ `.length) +
        '┃'.bold.brightGreen
    );
    console.log(
      `     ┃ `.bold.brightGreen +
        `Discord Bot is online!`.bold.brightGreen +
        ' '.repeat(
          -1 + stringlength - ` ┃ `.length - `Discord Bot is online!`.length
        ) +
        '┃'.bold.brightGreen
    );
    console.log(
      `     ┃ `.bold.brightGreen +
        ` /--/ ${client.user.tag} /--/ `.bold.brightGreen +
        ' '.repeat(
          -1 +
            stringlength -
            ` ┃ `.length -
            ` /--/ ${client.user.tag} /--/ `.length
        ) +
        '┃'.bold.brightGreen
    );
    console.log(
      `     ┃ `.bold.brightGreen +
        ' '.repeat(-1 + stringlength - ` ┃ `.length) +
        '┃'.bold.brightGreen
    );
    console.log(
      `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
        .bold.brightGreen
    );
  } catch {
    /* */
  }
});

client.services = new Collection();

['services.js'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
