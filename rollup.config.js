import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

const input = "dist/index.js";

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
};

// todo: https://reactjs.org/docs/optimizing-performance.html#rollup
export default {
  entry: input,
  input,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      globals,
      sourcemap: true
    }
  ],
  plugins: [resolve(), sizeSnapshot(), sourceMaps()]
};
