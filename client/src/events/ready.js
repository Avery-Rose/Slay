const chalk = require('chalk');
const printDivider = require('../util/printDivider');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Logged in as ${chalk.green(client.user.tag)}`);
    printDivider();
  },
};
