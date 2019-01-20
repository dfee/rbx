import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const env = process.env.NODE_ENV;

export default {
  input: "dist/index.js",
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  output: [
    {
      file: "dist/rbx.umd.js",
      format: "umd",
      globals: {
        classnames: "classNames",
        react: "React",
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes",
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
