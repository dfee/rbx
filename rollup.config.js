import resolve from "rollup-plugin-node-resolve";
import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve({
      only: ["emotion"]
    }),
    sass({
      output: true
    }),
    typescript({
      exclude: ["*.test.tsx", "*.story.tsx"],
      tsconfig: "tsconfig.json",
      typescript: require("typescript")
    })
  ]
};
