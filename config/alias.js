const glob = require('glob');
const path = require('path');
const alias = {};
const srcDir = glob.sync(`${__dirname}/../src/*/`);
srcDir.forEach(item => {
    const splitedDirName = item.split('/');
    const alisaName = splitedDirName[splitedDirName.length-2];
    alias[alisaName] = path.resolve(item)
});
module.exports = alias;
