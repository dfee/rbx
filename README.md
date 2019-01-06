## 👟 rbx – The Comprehensive Bulma UI Framework for React

[![Build Status](https://travis-ci.org/dfee/rbx.svg?branch=master)](https://travis-ci.org/dfee/rbx)
[![Coverage Status](https://coveralls.io/repos/github/dfee/rbx/badge.svg?branch=master)](https://coveralls.io/github/dfee/rbx?branch=master)
[![Release Version](https://img.shields.io/github/release/dfee/rbx.svg)](https://github.com/dfee/rbx)
[![Npm Downloads](https://img.shields.io/npm/dm/rbx.svg)](https://www.npmjs.com/package/rbx)

`rbx` is a comprehensive library of React components for [Bulma 0.7.2](http://bulma.io).

🔥 **[Read the docs](https://dfee.github.io/rbx/stories)**.

🙃 _I'll wait, go check them out!_

### To Install

`npm install rbx` or `yarn add rbx`

### To Use

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

To customize Bulma (including colors), follow the instructions below.

### Library

All components support ref-forwarding, and are able to render as any other React Component Type you want to provide, by using the special prop `as`.
For example, to render a `Button` component as a `react-router` `Link`:

```tsx
import { Button } from "rbx";
import { Link } from "react-router-dom";

export const goHomeLink = (
  <Button as={Link} to="/home" color="primary" text>
    Go home
  </Button>
);
```

### Customize Bulma

To override the variables set by Bulma, install Bulma (`npm install bulma@0.7.2`), and [follow the Bulma instructions](https://bulma.io/documentation/customize/variables/).

You will also need to import `rbx/dist/rbx.sass` as it contains any pertinent bug fixes for Bulma.

A minimal example of `App.sass` might look like:

```sass
$primary: #61dafb

@import "~rbx/dist/index.sass"
```

Or, for further customization;

```sass
$primary: #61dafb

@import "~bulma/bulma.sass" // alternatively, select which parts to include.
@import "~rbx/dist/rbx.sass"
```

Then, import this file somewhere in your project.

#### Create React App

Create React App 2 supports SASS compilation out of the box.

To get started, please follow the [official instructions](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet) to enable this feature.

Then, create a SASS file in your project (as described above):

Finally, import this stylesheet somewhere in your CRA app.

```js
import "./App.sass";
```

#### Prior Art

This package was forked from [`react-bulma-components`](https://github.com/couds/react-bulma-components`), and re-written in its entirety to support the latest version of Bulma, use TypeScript, and fix many outstanding bugs.
