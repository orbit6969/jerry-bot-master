const Command = require("../Command.js");

class List extends Command {
  constructor (client) {
    super(client, {
      name: "list",
      description: "Lists the custom commands.",
      usage: "list",
      aliases: [],
      perm: 'Special',
      enabled: false
    });
  }

  async run (client, message, args, level) { // eslint-disable-line no-unused-vars
    let cd = client.db.get('commands') || [];
   let embed = new client.embed()
   .setColor('RANDOM')
   .setTitle('Custom Commnads')
   .setTimestamp();
   cd.map(c => {
     embed.addField(c.name, c.message);
   });
   message.channel.send(embed);
  }
}

module.exports = List;
