const chalk = require('chalk');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // if the interaction is a slash command
    if (interaction.isChatInputCommand()) {
      const client = interaction.client;
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
        console.log(
          `Executed command ${chalk.green(
            interaction.commandName
          )} by ${chalk.green(interaction.user.tag)}`
        );
      } catch (error) {
        console.log(
          chalk.red(`Error executing command ${interaction.commandName}`)
        );
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
