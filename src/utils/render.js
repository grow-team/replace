const babel = require("babel-core");
const less = require('less');
const postcss = require('postcss');
const stylus = require('stylus');
const autoprefixer = require('autoprefixer');
const log = require('./log.js');

/**
 * todo: babel配置需要接收传入参数。
 */
const testBabel = {'presets': [
  'es2015',
  'stage-1'
],
'plugins': [
  'transform-export-extensions',
  'syntax-export-extensions'
]}
 
module.exports.babelRender = ({code,options={},file=''}) => {
  return new Promise((resolve,reject)=>{
    let result = babel.transform(code, testBabel);
    if(result){
      resolve(result.code);
    }else{
      reject('babel编译出错');
    }
  }).catch((error)=>{
    error.message = `${file}---js代码编译出错，请检查：${error.stack}`;
    log.fatal(error);
  })
}

module.exports.lessRender = ({css})=>{
  return new Promise((resolve,reject) => {
    less.render(css,(err,output) => {
      if(err){
        reject(err);
      }else{
        resolve(output.css);
      }
    })
  }).catch((error) =>{
    error.message = `${file}---less代码编译出错，请检查：${error.stack}`;
    log.fatal(error);
  })
}
/**
 * todo  postcss接收传入参数
 * 
 * @param {String} param0 
 */
module.exports.postcssRender = ({css,plugins=[autoprefixer],postOpts = {
  from: undefined
},file=''})=>{
    return postcss(plugins)
          .process(css,postOpts)
          .catch((error)=>{
            error.message = `${file}---postcss代码编译出错，请检查：${error.stack}`;
            log.fatal(error);
          })
  }

module.exports.stylusRender = ({css,file}) =>{
  let content = css;
  return new Promise((resolve,reject) => {
    stylus.render(content,(err,result) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    });
  }).catch((error) =>{
    error.message = `${file}---stylue代码编译出错，请检查：${error.stack}`;
    log.fatal(error);
  })
}
