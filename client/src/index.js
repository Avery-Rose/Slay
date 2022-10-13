const {
  Client,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
} = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const deploy = require('./deploy-commands.js');
const emoji = require('node-emoji');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
  ],
});
const printDivider = require('./util/printDivider');
require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin.json');
let db;

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log(`🔥: Firebase initialized`);
  db = admin.firestore();
};

// Command Handler
const loadCommands = () => {
  console.log('Loading commands...');
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    console.log(`\u2022 Loaded command ${chalk.green(command.data.name)}`);
  }
};

// Event Handler
const loadEvents = () => {
  console.log('Loading events...');
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    console.log(`\u2022 Loaded event ${chalk.green(event.name)}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};

const init = () => {
  initFirebase();
  loadCommands();
  loadEvents();
  console.log('Logging in...');
  client.login(process.env.TOKEN);
};

const main = () => {
  printDivider();
  console.log(chalk.magenta('Process Info:'));
  console.log(`\u2022 Hostname: ${chalk.green(require('os').hostname())}`);
  console.log(`\u2022 Node Version: ${chalk.green(process.version)}`);
  console.log(`\u2022 Process ID: ${chalk.green(process.pid)}`);
  console.log(`\u2022 Platform: ${chalk.green(process.platform)}`);
  console.log(`\u2022 Architecture: ${chalk.green(process.arch)}`);
  console.log(`\u2022 CPU Cores: ${chalk.green(require('os').cpus().length)}`);
  console.log(
    `\u2022 CPU Model: ${chalk.green(require('os').cpus()[0].model)}`
  );
  printDivider();
  const questions = [
    {
      type: 'confirm',
      name: 'deploy',
      message: 'Do you want to deploy commands?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'login',
      message: 'Continue to login?',
      default: true,
    },
  ];
  inquirer.prompt(questions).then(async (answers) => {
    printDivider();
    if (answers.deploy) {
      console.log(chalk.green('Deploying commands...'));
      await deploy();
      printDivider();
    }
    if (answers.login) {
      init();
    }
  });
};

// production mode
if (process.env.NODE_ENV === 'production') {
  init();
} else {
  main();
}
