class Command {

  constructor (client, {
    name = null,
    description = "No description provided.",
    category = "Miscellaneous",
    usage = "No usage provided.",
    enabled = true,
    guildOnly = true,
    aliases = new Array(),
    perm = "Special"
  }) {
    this.client = client;
    
    let { roleId, devId, roleName } = this.client.config;
    
    this.checkPerm =(message, p) => {
        let role = message.member.roles.cache.get(roleId);
        let rolename = message.member.roles.cache.find(r => r.name == roleName);
        let dev = message.author.id == devId;
        
        if((p == 'Dev') && !dev) {
          return false;
        };
        
        if((p == 'Special') || (p == 'Dev')) {
          if(!role && !dev && !rolename) return false;
          return true;
        };
        if(p != 'User') return false;
        return true;
    };
        
    this.conf = { enabled, guildOnly, aliases, perm };
    this.help = { name, description, category, usage };
  }
}
module.exports = Command;
