## rbx with-customization

This example shows how you might use **rbx** with [Create React App](https://facebook.github.io/create-react-app/) and [TypeScript](http://typescriptlang.org/).

**Note:** this example is part of **rbx**'s continuous integration end-to-end testing.
Therefore, the code is up to date and works with the latest version of **rbx**.

### Running

Unless you're building `rbx` from scratch, you'll want to follow these instructions:

1. add the latest `rbx` to the `package.json`

```diff
  "dependencies": {
-   "rbx": "file:../../dist",
+   "rbx": "^2.0.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "2.1.3"
  },
```

2. `npm install`
3. `npm run start`

### Testing

1. Follow the step above for installing `rbx` (as above).
2. `npm run test`
