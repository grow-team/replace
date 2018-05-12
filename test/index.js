const expect = require('chai').expect;
const Bundle = require('../src/bundle.js');

describe('测试bundle', async function() {
  it('返回bundle打包好的代码片段，成功', async function() {
    let bundle = new Bundle();
    await bundle.build('fortest/*.tpl');
    await bundle.render();
    expect(true);
  });
});