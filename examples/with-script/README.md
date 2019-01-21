## rbx with-scripts

This example shows how you might use **rbx** as a set of scripts in the browser.
In practice, you'll probably want to use a CDN like [unpkg](https://unpkg.com/).

This demonstrates the **UMD** functionality.

**Note:** this example is part of **rbx**'s continuous integration end-to-end testing.
Therefore, the code is up to date and works with the latest version of **rbx**.

### Running

Unless you're building `rbx` from scratch, you'll want to follow these instructions:

1. add the latest `rbx` to the `package.json`

```diff
  "dependencies": {
    "classnames": "^2.2.6",
    "express": "^4.16.4",
    "prop-types": "^15.6.2",
-   "rbx": "file:../../dist",
+   "rbx": "^2.0.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  },
```

2. `npm install`
3. `npm run start`

### Testing

1. Follow the step above for installing `rbx` (as above).
2. `npm run start &`
3. `npm run test`
