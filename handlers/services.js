const fs = require('fs');
const Table = require('ascii-table');
const allServices = [];

module.exports = async (client) => {
  try {
    const serviceFiles = fs
      .readdirSync(`./services/`)
      .filter((file) => file.endsWith('.js'));

    const table = new Table();

    table.setTitle('Services');
    table.setHeading('Service', 'Status');

    for (let file of serviceFiles) {
      const serviceName = file.split('.')[0];
      allServices.push(serviceName);

      client.on('message', async (message) => file.bind(client, message));

      table.addRow(serviceName, '✅');
    }

    console.log(table.toString());
  } catch (error) {
    console.log(error);
  }
};
