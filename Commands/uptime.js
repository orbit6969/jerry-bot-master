const Base = require("../Command");

class Uptime extends Base {
constructor(client) {
super(client,{
     name: "uptime",
     description: "Shows the uptime of bot.",
     aliases: ["up"],
     perm: 'User'
     });
     };
  
    async run(client,message,args) {
    
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
    }

    let embed = new client.embed()
      .setColor("RANDOM")
      .setDescription(`I have been online for: ${duration(client.uptime)}`)
      message.channel.send(embed);
    };
   
};

module.exports = Uptime;
