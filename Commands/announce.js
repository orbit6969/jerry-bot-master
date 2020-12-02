const Command = require("../Command.js");

class Announce extends Command {
  constructor(client) {
    super(client, {
      name: "announce",
      description: "Announce something",
      usage: "announce <ping|null> #channel <title> <message>",
      aliases: ["a"]
    });
  }

  async run(client, message, args, level) { // eslint-disable-line no-unused-vars

    let ping = args[0];
    let channel = message.mentions.channels.first() || message.channel;
    let color = '#02e7eb';
    let images = message.attachments;
    let content = args.splice(2).join(' ');
    let array = content.split('--');

    try {
      const embed = new this.client.embed()
        .setColor(color)
        .setTimestamp()

      if (ping != 'null' && ping) {
        if (ping.includes('@')) {
          ping = ping;
        } else {
          if (ping == 'here') {
            ping = '@here'
          } else {
            ping = message.guild.roles.cache.find(r => role.name == ping);
            if (ping) ping = ping.toString();

          }
        };
      };

      ping = null;

      embed.setTitle(array[0])
      embed.setDescription(array[1])
      if(images.first()) {
        embed.setImage(images.first().url);
      };
      
      
      channel.send(ping, { embed })
      .then(() => {
        images.map((image,i) => {
          if(i == 0) return;
        let emb = new client.embed()
          .setColor(color)
          .setImage(image.url)
          channel.send(emb);
        })
      });

    } catch (e) {
      console.debug(e);
      message.channel.send('Something wenr wrong');
    }
  }
}

module.exports = Announce;