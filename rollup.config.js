import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const env = process.env.NODE_ENV;

export default {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  input: "dist/index.js",
  output: [
    {
      file: "dist/rbx.umd.js",
      format: "umd",
      globals: {
        classnames: "classNames",
        "prop-types": "PropTypes",
        react: "React",
        "react-dom": "ReactDOM",
      },
      name: "rbx",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    replace({ "process.env.NODE_ENV": JSON.stringify(env) }),
    sizeSnapshot(),
    env === "production" && terser(),
  ],
};
