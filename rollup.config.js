import resolve from "rollup-plugin-node-resolve";
import sass from "rollup-plugin-sass";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const input = "./src/index.ts";

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
};

export default {
  entry: input,
  input,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  output: [
    {
      file: pkg.module,
      format: "es",
      globals,
      sourcemap: true
    },
    {
      file: pkg.main,
      format: "cjs",
      globals,
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "compiled"
      }
    }),
    sass({ output: "dist/index.css" }),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        include: ["src"],
        exclude: [
          "node_modules",
          "dist",
          "__mocks__",
          "**/__tests__",
          "stories"
        ]
      }
    }),
    sizeSnapshot(),
    sourceMaps()
  ]
};
