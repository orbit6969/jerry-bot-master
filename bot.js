const { Client, Collection, MessageEmbed } = require('discord.js');
const config = require('./config');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const path = require('path');
const klaw = require('klaw');

class Bot extends Client {
  constructor(options) {
    super(options);
    this.config = config;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.embed = MessageEmbed;
    this.logger = console;
  }

  async awaitReply(msg, question, limit = 60000) {
    const filter = m => m.author.id == msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first();
    } catch (e) {
      throw new Error(e);
    }
  }

  loadCommand (commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
      this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  async unloadCommand (commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }
  
  async init() {
  klaw("./Commands").on("data", (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = this.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response) this.logger.error(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./Events/");
  this.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    this.logger.log(`Loading Event: ${eventName}`);
    const event = new (require(`./Events/${file}`))(this);
    // This line is awesome by the way. Just sayin'.
    this.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./Events/${file}`)];
  });
};

  start() {
    this.init();
    this.login(this.config.token);
  };
  
}

const intents = ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"];

const bot = new Bot({ 
  ws: { intents }
});

bot.start();

module.exports = bot;