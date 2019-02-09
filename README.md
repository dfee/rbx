## rbx – The Comprehensive Bulma UI Framework for React

[![Build Status](https://travis-ci.org/dfee/rbx.svg?branch=master)](https://travis-ci.org/dfee/rbx)
[![Coverage Status](https://coveralls.io/repos/github/dfee/rbx/badge.svg?branch=master)](https://coveralls.io/github/dfee/rbx?branch=master)
[![Release Version](https://img.shields.io/github/release/dfee/rbx.svg)](https://github.com/dfee/rbx)
[![Npm Downloads](https://img.shields.io/npm/dm/rbx.svg)](https://www.npmjs.com/package/rbx) [![Greenkeeper badge](https://badges.greenkeeper.io/dfee/rbx.svg)](https://greenkeeper.io/)

![A quick look](src/__docs__/public/demo.png?raw=true "A quick look")

### 👟 **[Read the docs](https://dfee.github.io/rbx)**.

🙃 _I'll wait, go check them out!_

### Features

- up-to-date Bulma implementation (0.7.4)
- written with TypeScript 3 for React 16
- well tested and [documented](https://dfee.github.io/rbx)
- extensive customization support
- _quite unopinionated, if you ask me_
- **very simple to get started**

### To install

`npm install rbx` or `yarn add rbx`

### To use

```tsx
import "rbx/index.css";
import React from "react";
import { Columns } from "rbx";

export const MyPage = () => (
  <Columns>
    <Columns.Column>First Column</Columns.Column>
    <Columns.Column>Second Column</Columns.Column>
    <Columns.Column>Third Column</Columns.Column>
    <Columns.Column>Fourth Column</Columns.Column>
  </Columns>
);
```

Documentation for all the components, information on customization, a defense of design, and more is available at the [canonical rbx documentation](https://dfee.github.io/rbx)

### License

**rbx** is available under the [MIT License](https://opensource.org/licenses/MIT).

The sneaker logo is a modified version of the [Twitter Twemoji](https://github.com/twitter/twemoji) _running shoe_ under the [Creative Commons Attribution License](https://creativecommons.org/licenses/by/4.0/).

### Prior Art

This package was forked from [`react-bulma-components`](https://github.com/couds/react-bulma-components), and re-written in its entirety to support the latest version of Bulma, use TypeScript, and fix many outstanding bugs.
