const Command = require("../Command");

class Restart extends Command {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "Restarts bot process",
      usage: "restart",
      aliases: ["update"],
      perm: "Dev"
    });
  }

  async run(client, message, args) {
    client.user.setActivity("restarting");
    message.channel.send("<a:emoji_2:688667325796319278>  Restarting..")
      .then(() => {
        process.exit(1);
      });
  };
}


module.exports = Restart;