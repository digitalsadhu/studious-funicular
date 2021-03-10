import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.js',
  plugins: [
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
    //   plugin(),
    //   terser({
    //       format: {
    //           comments: false,
    //       },
    //   })
  ],
  output: [
      { 
          sourcemap: true,
          format: 'esm',
          file: 'public/scripts.js',
      },
  ],
};