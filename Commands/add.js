const Command = require("../Command.js");

class Add extends Command {
  constructor (client) {
    super(client, {
      name: "add",
      description: "Adds a custom command",
      usage: "add <name> <message>",
      aliases: [],
      perm: 'Special',
      enabled: false
    });
  }

  async run (client, message, args, level) { // eslint-disable-line no-unused-vars
    const cmdname = args[0].toLowerCase();
    const dsc = args.splice(1).join(' ');
    
    let custom = {
      name: cmdname,
      message: dsc
    };
    let cd = client.db.get('commands');
    if(cd && cd.some(c => c.name == cmdname)) {
      return message.channel.send(`The command \`${cmdname}\` already exists`);
    };
    if(!cd) {
      client.db.set('commands', [custom]);
    } else {
      client.db.push('commands', custom);
    };
    message.channel.send(`The command \`${cmdname}\` has been added`);
  }
}

module.exports = Add;
