import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/scripts.js',
  plugins: [
      nodeResolve({ browser: true, preferBuiltins: false }),
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
          file: 'dist/scripts.js',
      },
  ],
};