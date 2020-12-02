module.exports = class {
  constructor(client) {
    this.client = client;
  };
  
  async run() {
    
  console.log('Bot logged in as '+ this.client.user.tag);
  this.client.user.setActivity(this.client.config.status, {
    type: this.client.config.type
  });
  
  };
};
  
