/**
 * 每一个文件对应一个module
 */
const reg = require('./utils/reg.js');
const load = require('./utils/load.js');
const parse = require('./utils/parse.js');
const compile = require('./utils/compile.js');
const log = require('./utils/log.js');

module.exports = class Module{
  // 文件路径当作key，内容是value的Map
  constructor(id){
    this.id = id;
    this.source = null;
    this.oldSource = null;
    this.replace = []; // 替换标记数据
    this.compiles = []; // 异步替换文件
  }

  async buildModule(){
    let id = this.id;
    this.oldSource = await load(id);
    for(let i=0,j=reg.length; i<j; i++){
      let parseArr = parse(reg[i],this.oldSource);
      this.replace = this.replace.concat(parseArr);
    }
    this.compiles = compile(this.replace,id);
    log.success(`${id}：解析完成，等待编译...`);
  }

  async render(){
    let oldSource = this.oldSource;
    let compiles = this.compiles;
    let replace = this.replace;
    let origHtml = oldSource;
    this.source = origHtml;
    return Promise.all(compiles).then((results) => {
      if (compiles.length) {
        let startIndex = 0;
        let ret = '';
        results.map((seg, index) => {
          let oneReplace = replace[index];
          let position = oneReplace.position;
          ret += origHtml.slice(startIndex, position.start);
          if(oneReplace.pre === 'local'){
            ret += `<script ${oneReplace.params}>\r\n ${seg} \r\n</script>`
          }else{
            ret += `<style ${oneReplace.params}>\r\n ${seg} \r\n</style>`
          }
          startIndex = position.end;
        });
        ret += origHtml.slice(startIndex);
        this.source = ret;
      } 
      log.success(`${this.id}：编译完成，等待写入...`);
      log.success(this.source);
      return this.source;
    },(error) =>{
      throw new Error(error);
    }).catch((error)=>{
      throw new Error(error);
    })
  }
}