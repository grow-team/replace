// 匹配style
const styleRg = /<style((?:\s+\w+\s*(?:=\s*(?:(['"])(?:\\.|(?!\2)[^\\])*?\2)?)?)*)\s*>([\s\S]*?)(<\s*\/style\s*>)/gmi;
// 匹配js
const jsRg = /<script((?:\s+\w+\s*(?:=\s*(?:(['"])(?:\\.|(?!\2)[^\\])*?\2)?)?)*)\s*>([\s\S]*?)(<\s*\/script\s*>)/gmi;

module.exports = [styleRg,jsRg]