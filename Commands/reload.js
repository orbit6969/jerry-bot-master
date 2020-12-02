const Command = require("../Command");

class Reload extends Command {
  constructor (client) {
    super(client, {
      name: "reload",
      description: "Reloads a command that has been modified.",
      category: "System",
      usage: "reload [command]",
      perm: "Dev"
    });
  }

  async run (client,message, args) { // eslint-disable-line no-unused-vars
        let command = args[0];
    console.log(command);
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(!cmd){
            message.channel.send(`The \`${command}\` doesn't exists.`);
        };
 await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
        await this.client.loadCommand(cmd.conf.location, cmd.help.name)
    message.channel.send(`The command \`${args[0]}\` has been reloaded`);
  
  }
}
module.exports = Reload;
