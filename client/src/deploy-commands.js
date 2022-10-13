const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const chalk = require('chalk');
require('dotenv').config();

const deploy = async (clearsConsole) => {
  const clear = () => (clearsConsole ? console.clear() : null);
  clear();

  const commands = [
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with pong!'),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  console.log('Registering commands...');
  commands.forEach((command, i) => {
    console.log(`${i + 1}. ${chalk.green(command.name)}`);
  });

  await rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) => {
      clear();
      console.log(`Registered ${chalk.green(data.length)} command(s).`);
      data.forEach((command, i) => {
        console.log(`${i + 1}. ${chalk.green(command.name)}`);
      });
    })
    .catch((err) => {
      clear();
      console.log(chalk.red('Error while registering commands'));
      console.error(err);
      process.exit(1);
    });
};

process.on('exit', (code) => {
  if (code === 0) return;
  console.log(chalk.red('Process exited with code: ' + code));
});

module.exports = deploy;
