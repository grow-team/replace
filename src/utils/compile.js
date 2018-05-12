/**
 * 
 * @param  chunkArr 
 * let obj = {
        position: {
          start: seg.index,
          end: lastIndex
        },
        content: seg[3],
        pre: type[2],
        typeProp: type[0]
      }
 */
const render = require('./render.js');

module.exports = (chunkArr,postcssPlugins,file='') =>{
  let parsArr =[];

  for(let i=0,j=chunkArr.length; i<j; i++){
    let pre = chunkArr[i].pre;
    let prom = Promise.resolve();
    switch (pre) {
      case 'less':
        let comLess = {
          css: chunkArr[i].content,
          file: file
        }
        prom = render.lessRender(comLess);
        break;
      case 'stylus':
        let comStylus = {
          css: chunkArr[i].content,
          file: file
        }
        prom = render.stylusRender(comStylus);
        break;
      case 'local':
        let comJs = {
          code: chunkArr[i].content,
          file: file
        }
        prom = render.babelRender(comJs);
        break;
    }
    // postcss添加在其他编译之后
    if(pre==='local'){
      parsArr.push(prom.then((result)=>{
        return result;
      },(error)=>{
        throw new Error(error);
      }));
    }else{
      parsArr.push(prom.then((css) => {
        return render.postcssRender({css,postcssPlugins,file}).then((result) => {
          return result.css;
        },(error) => {
          throw new Error(error);
        });
      }));
    }
  }
  return parsArr;
}