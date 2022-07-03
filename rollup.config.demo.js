import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "demo/index.tsx",
  output: {
    file: "docs/demo/index.js",
    format: "iife",
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    external(),
    postcss({
      extract: false,
      use: ['sass'],
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true
    }),
    terser()
  ]
};


