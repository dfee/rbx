# <div style="display: flex; align-items: center"><img src="https://raw.githubusercontent.com/dfee/rbx/master/docs/images/logo.png" width="40" style="margin-top: 3px" /><span>rbx</span></div>

[![Build Status](https://travis-ci.org/dfee/rbx.svg?branch=master)](https://travis-ci.org/dfee/rbx)
[![Coverage Status](https://coveralls.io/repos/github/dfee/rbx/badge.svg?branch=master)](https://coveralls.io/github/dfee/rbx?branch=master)
[![Release Version](https://img.shields.io/github/release/dfee/rbx.svg)](https://github.com/dfee/rbx)
[![Npm Downloads](https://img.shields.io/npm/dm/rbx.svg)](https://www.npmjs.com/package/rbx)

React components for Bulma (v0.7.1) framework

This is an implementation of the [Bulma](http://bulma.io/) Framework Component in React by Jeremy Thomas.

You can find the Storybook stories of all components [here](https://dfee.github.io/rbx/)

### BREAKING CHANGES:

- Dropped support for react < 16.2
- Navbar Menu its now a controlled component. there is a prop to show/hide the mobile menu

### To Install

`npm install rbx` or `yarn add -E rbx`

### To Use

Follow the instructions for creating a `_variables.sass` for your project, then:

```javascript
import React from "react";
// You can import from the global component (you will need to include the css file dist/rbx.min.css)
import { Columns } from "rbx";

// You can also include the js that also bundles the css (do not work with server-side rendering)
import { Columns } from "rbx/full";

// [RECOMENDED] Or import only the components you will use (this will reduce the total bundle size)
// If you use this approach and want to use the global Bulma styles, import rbx/src/index.sass and configure webpack to handle sass files
import Columns from "rbx/lib/components/columns";

export default () => (
  <Columns>
    <Columns.Column>First Column</Columns.Column>
    <Columns.Column>Second Column</Columns.Column>
    <Columns.Column>Third Column</Columns.Column>
    <Columns.Column>Fourth Column</Columns.Column>
  </Columns>
);
```

### Documentation

You can find the documentation in https://dfee.github.io/rbx

Each component imports their own sass file. Thus, you can reduce your css total file size by only including the styles that you will use. To enable this, please configure your [Webpack](https://webpack.github.io/) to handle sass files. You can use the webpack.config.js on the root folder of this repository.

Some components may vary the api/naming convention with the Bulma Docs. Please refer to each stories in the Storybook to see how each component could be used (you can find the source code of the story by using the button "Show info" on the top-right corner of the page).

The following components were ported:

- Box ([Storybook](https://dfee.github.io/rbx/?selectedKind=Box)) ([Docs](http://bulma.io/documentation/elements/box/))
- Breadcrumb ([Storybook](https://dfee.github.io/rbx/?selectedKind=Breadcrumb)) ([Docs](http://bulma.io/documentation/components/breadcrumb/))
- Button ([Storybook](https://dfee.github.io/rbx/?selectedKind=Button)) ([Docs](http://bulma.io/documentation/elements/button/))
- Card ([Storybook](https://dfee.github.io/rbx/?selectedKind=Card)) ([Docs](http://bulma.io/documentation/components/card/))
- Column ([Storybook](https://dfee.github.io/rbx/?selectedKind=Columns)) ([Docs](http://bulma.io/documentation/columns/basics/))
- Container ([Storybook](https://dfee.github.io/rbx/?selectedKind=Container)) ([Docs](http://bulma.io/documentation/layout/container/))
- Content ([Storybook](https://dfee.github.io/rbx/?selectedKind=Content)) ([Docs](http://bulma.io/documentation/elements/content/))
- Dropdown ([Storybook](https://dfee.github.io/rbx/?selectedKind=Dropdown)) ([Docs](http://bulma.io/documentation/components/dropdown/))
- Footer ([Storybook](https://dfee.github.io/rbx/?selectedKind=Footer)) ([Docs](http://bulma.io/documentation/layout/footer/))
- Form ([Storybook](https://dfee.github.io/rbx/?selectedKind=Form)) ([Docs](http://bulma.io/documentation/form/general/))
- Heading (Title, Subtitle and heading on Bulma) ([Storybook](https://dfee.github.io/rbx/?selectedKind=Heading)) ([Docs](http://bulma.io/documentation/elements/title/))
- Hero ([Storybook](https://dfee.github.io/rbx/?selectedKind=Hero)) ([Docs](http://bulma.io/documentation/layout/hero/))
- Icon ([Storybook](https://dfee.github.io/rbx/?selectedKind=Icon)) ([Docs](http://bulma.io/documentation/elements/icon/))
- Image ([Storybook](https://dfee.github.io/rbx/?selectedKind=Image)) ([Docs](http://bulma.io/documentation/elements/image/))
- Level ([Storybook](https://dfee.github.io/rbx/?selectedKind=Level)) ([Docs](http://bulma.io/documentation/layout/level/))
- Loader ([Storybook](https://dfee.github.io/rbx/?selectedKind=Loader))
- Media ([Storybook](https://dfee.github.io/rbx/?selectedKind=Media)) ([Docs](http://bulma.io/documentation/layout/media-object/))
- Message ([Storybook](https://dfee.github.io/rbx/?selectedKind=Message)) ([Docs](http://bulma.io/documentation/components/message/))
- Menu ([Storybook](https://dfee.github.io/rbx/?selectedKind=Menu)) ([Docs](http://bulma.io/documentation/components/menu/))
- Modal ([Storybook](https://dfee.github.io/rbx/?selectedKind=Modal)) ([Docs](http://bulma.io/documentation/components/modal/))
- Navbar ([Storybook](https://dfee.github.io/rbx/?selectedKind=Navbar)) ([Docs](https://bulma.io/documentation/components/navbar/))
- Notification ([Storybook](https://dfee.github.io/rbx/?selectedKind=Notification)) ([Docs](http://bulma.io/documentation/elements/notification/))
- Pagination ([Storybook](https://dfee.github.io/rbx/?selectedKind=Pagination)) ([Docs](https://bulma.io/documentation/components/pagination/))
- Panel ([Storybook](https://dfee.github.io/rbx/?selectedKind=Panel)) ([Docs](https://bulma.io/documentation/components/panel/))
- Progress ([Storybook](https://dfee.github.io/rbx/?selectedKind=Progress)) ([Docs](http://bulma.io/documentation/elements/progress/))
- Section ([Storybook](https://dfee.github.io/rbx/?selectedKind=Section)) ([Docs](http://bulma.io/documentation/layout/section/))
- Tabs ([Storybook](https://dfee.github.io/rbx/?selectedKind=Tabs)) ([Docs](https://bulma.io/documentation/components/tabs/))
- Table ([Storybook](https://dfee.github.io/rbx/?selectedKind=Table)) ([Docs](http://bulma.io/documentation/elements/table/))
- Tag ([Storybook](https://dfee.github.io/rbx/?selectedKind=Tag)) ([Docs](http://bulma.io/documentation/elements/tag/))
- Tile ([Storybook](https://dfee.github.io/rbx/?selectedKind=Tile)) ([Docs](http://bulma.io/documentation/layout/tiles/))

### Override Bulma variables

To override the variables set by Bulma you will need to create a sass file like this one (\_variable.sass):

```sass
@import '~bulma/sass/utilities/initial-variables.sass'

// ADD HERE variables you want to override
$primary: #f4f4f4

@import '~bulma/sass/utilities/_all.sass'
```

It may be necessary, depending on your project setup, to create this file, even if you do not intend on overriding default styles.

After that you will need to add an alias pointing to the file to your webpack configuration

```
resolve {
  // Other resolve props
  alias: {
    // Other aliases
    '_variables.sass': path.resolve(__dirname, 'relative/path/from/webpack/config/to/your/_variables.sass'),
  },
}

```

**For Gatsby.js v1** you can add a `modifyWebpackConfig` export to your `gatsby-node.js` file:

```
exports.modifyWebpackConfig = ({config, env}) => {
  config.merge({
    resolve: {
      alias: {
        '_variables.sass': path.resolve(__dirname, 'relative/path/from/webpack/config/to/your/_variables.sass')
      }
    }
  })
  return config
}
```

**For Gatsby.js v2** you can add a `onCreateWebpackConfig` export to your `gatsby-node.js` file:

```
const path = require('path')

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '_variables.sass': path.resolve(__dirname, 'relative/path/from/webpack/config/to/your/_variables.sass'),
      },
    },
  })
}
```

### Override Bulma variables in Create React App

Create React App 2 now supports automatic SASS compilation, meaning that all you need to do to get Bulma working is [follow the instructions provided by the CRA team](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-sass-stylesheet) and create a SASS file in your project with the following code:

```sass
// Any Bulma variables I want to override go here...
$family-sans-serif: 'Overpass', sans-serif

@import '~rbx/src/index'
```

Of course, as per the CRA team's instructions, make sure to import this stylesheet somewhere in your CRA app:

```js
import "./App.sass";
```
