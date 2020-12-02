const Command = require("../Command.js");

class Remove extends Command {
  constructor (client) {
    super(client, {
      name: "remove",
      description: "Removes a custom command",
      usage: "remove <name>",
      aliases: [],
      perm: 'Special',
      enabled: false
    });
  }

  async run (client, message, args, level) { // eslint-disable-line no-unused-vars
    const cmdname = args[0].toLowerCase();
   
    let cd = client.db.get('commands') || [];
    let f = cd.find(c => c.name == cmdname);
    if(f) {
      let all = cd.filter(c => c.name != cmdname);
      client.db.set('commands', all);
      message.channel.send(`The command \`${cmdname}\` has been removed`);
    } else {
      return message.channel.send(`The command \`${cmdname}\` doesnt exists`);
    };
  }
}

module.exports = Remove;
