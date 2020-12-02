// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (message) {

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    //  and not get into a spam loop (we call that "botception").
    if (message.author.bot) return; 
    // Cancel any attempt to execute commands if the bot cannot respond to the user.
    /**
    if (message.guild && !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;
    **/
   

    // Checks if the bot was mentioned, with no message after it, returns the prefix.
    const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`My prefix is \`${this.client.config.prefix}\``);
    }

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(this.client.config.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);

    // Get the user or member's permission level from the elevation
  

    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    /**
    let cd = this.client.db.get('commands') || [];
    let cmd2 = cd.find(c => c.name == command);
    if(cmd2) return message.channel.send(cmd2.message);
    **/
    // using this const varName = thing OR otherthign; is a pretty efficient
    // and clean way to grab one of 2 values!
    if (!cmd) return;
    if(!cmd.conf.enabled) return;
 
    if(!cmd.checkPerm(message, cmd.conf.perm)) return message.channel.send('Tumse nhi ho payega...');
    
    message.flags = [];
    while (args[0] &&args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    
    // If the command exists, **AND** the user has permission, run it.
    this.client.logger.log(`${message.author.tag} ran ${cmd.help.name} command`);
    cmd.run(this.client, message, args)
  }
};
