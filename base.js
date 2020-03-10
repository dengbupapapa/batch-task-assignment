import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import builtin from 'rollup-plugin-node-builtins';


const plugins = [
    resolve({
    }),
    babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    globals(),
    builtin(),
];



export default [{
    input: './index.js',
    plugins:[...plugins],
    output:{name: 'batchTaskAssignment',format: 'umd'}
},{
    input: './index.js',
    plugins:[...plugins],
    output:{name: 'batchTaskAssignment',format: 'es'}
}];