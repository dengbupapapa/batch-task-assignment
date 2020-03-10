import baseConfig from './base.js';
import {terser} from 'rollup-plugin-terser';
const version = process.env.VERSION || require('./package.json').version
// 设置头部注释信息
const banner ='/*!\n' +
    ` * batch-task-assignment v${version}\n` +
    ` * (c) ${new Date().getFullYear()}-${new Date().getMonth()+1} dengbupapapa\n` +
    ' * Released under the MIT License.\n' +
    ' */'

// 设置尾部注释信息
const footer =`/** ${new Date()} **/`;


function prodConfig(){


    baseConfig[0].plugins.push(terser({
        compress:{
            drop_console:true
        }
    }));
    baseConfig[0].output.file=`./index.umd.js`;
    baseConfig[1].output.file=`./index.es.js`;

    return baseConfig;

}

export default prodConfig();