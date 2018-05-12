const render = require('./render.js');
const supportType = 'less|stylus|postcss|local';
const log = require('./log.js');

/**
 * 
 * @param {} 
 * reg:匹配处理字符串的正则
 * source:源码
 * postcssPlugins[]:需要执行的postcss插件 eg:[
                                            popacity({
                                              legacy: true
                                            }),
                                            colorRgbaFallback(),
                                            autoprefixer({
                                              browsers: ['ie 6-11', 'last 50 versions']
                                            })
                                          ];
  *
  * 匹配到的内容 
  * <style type="text/stylus">...</style>
  * <script type="local">...</script>
  * 
  * return:[{
  *   position:{start:10,end:20},
  *   content: '需要编译内容',
  *   pre: 'less|stylus|postcss|local',
  *   typeProp: 'text/stylus'
  * }]
 */
module.exports = (reg,source,file='') => {
  let regRule = new RegExp(reg); // 匹配需要处理的字符串
  let seg = null; //
  let retArr = [];
	while ((seg = regRule.exec(source)) !== null) {
		((seg, lastIndex) => {
      let params = seg[1];
      // 匹配出type=less/stylus/postcss/local
			let type = /\s+type\s*=\s*(['"]?)\s*(?:text\/)?(less|stylus|postcss|local)\s*?\1/i.exec(params);
      if(!type){
        log.warn(`${file}目前支持的type类型有，css：less、stylus、postcss；js：local`)
        return;
      }
      let obj = {
        position: {
          start: seg.index,
          end: lastIndex
        },
        content: seg[3],
        pre: type[2],
        typeProp: type[0],
        params: params.replace(type[0], '') // 标签上可能携带其他参数
      };
      retArr.push(obj);
		})(seg, regRule.lastIndex);
  }
	return retArr;
};

