/**
 * 
 */
const glob = require('./utils/glob');
const Module = require('./module');
module.exports = class Bundle{
  constructor() {
    this.modules = [];
  }
  async build(input){
    const files = await glob(input);
    for(let i=0,j=files.length; i<j; i++){
      let oneModule = new Module(files[i]);
      await oneModule.buildModule();
      this.modules.push(oneModule);
    }
  }

  async render(){
    for(let i=0,j=this.modules.length; i<j; i++){
      this.modules[i].render();
    }
  }
}