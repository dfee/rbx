## 👟 rbx :: UI Components for React, Based on Bulma

[![Build Status](https://travis-ci.org/dfee/rbx.svg?branch=master)](https://travis-ci.org/dfee/rbx)
[![Coverage Status](https://coveralls.io/repos/github/dfee/rbx/badge.svg?branch=master)](https://coveralls.io/github/dfee/rbx?branch=master)
[![Release Version](https://img.shields.io/github/release/dfee/rbx.svg)](https://github.com/dfee/rbx)
[![Npm Downloads](https://img.shields.io/npm/dm/rbx.svg)](https://www.npmjs.com/package/rbx)

React components based on the Bulma framework. This is a hard fork of [`react-bulma-components`](https://github.com/couds/react-bulma-components) rewritten in its entirety in TypeScript.

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

#### Columns

| Item   | Storybook                                                   | Bulma Documentation                                            |
| ------ | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Column | [Stories](https://dfee.github.io/rbx/?selectedKind=Columns) | [Documentation](http://bulma.io/documentation/columns/basics/) |

#### Layout

| Item      | Storybook                                                              | Bulma Documentation                                                 |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Container | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FContainer) | [Documentation](http://bulma.io/documentation/layout/container/)    |
| Level     | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FLevel)     | [Documentation](http://bulma.io/documentation/layout/level/)        |
| Media     | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FMedia)     | [Documentation](http://bulma.io/documentation/layout/media-object/) |
| Hero      | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FHero)      | [Documentation](http://bulma.io/documentation/layout/hero/)         |
| Section   | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FSection)   | [Documentation](http://bulma.io/documentation/layout/section/)      |
| Footer    | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FFooter)    | [Documentation](http://bulma.io/documentation/layout/footer/)       |
| Tile      | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FTile)      | [Documentation](http://bulma.io/documentation/layout/tiles/)        |

#### Form

| Item | Storybook                                                | Bulma Documentation                                          |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------ |
| Form | [Stories](https://dfee.github.io/rbx/?selectedKind=Form) | [Documentation](http://bulma.io/documentation/form/general/) |

#### Elements

| Item         | Storybook                                                                   | Bulma Documentation                                                   |
| ------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Box          | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FBox)          | [Documentation](http://bulma.io/documentation/elements/box/)          |
| Button       | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FButton)       | [Documentation](http://bulma.io/documentation/elements/button/)       |
| Content      | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FContent)      | [Documentation](http://bulma.io/documentation/elements/content/)      |
| Delete       | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FDelete)       | [Documentation](http://bulma.io/documentation/elements/delete/)       |
| Icon         | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FIcon)         | [Documentation](http://bulma.io/documentation/elements/icon/)         |
| Image        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FImage)        | [Documentation](http://bulma.io/documentation/elements/image/)        |
| Notification | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FNotification) | [Documentation](http://bulma.io/documentation/elements/notification/) |
| Progress     | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FProgress)     | [Documentation](http://bulma.io/documentation/elements/progress/)     |
| Table        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTable)        | [Documentation](http://bulma.io/documentation/elements/table/)        |
| Tag          | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTag)          | [Documentation](http://bulma.io/documentation/elements/tag/)          |
| - Title      | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTitle)        | [Documentation](http://bulma.io/documentation/elements/title/)        |

#### Components

| Item       | Storybook                                                                   | Bulma Documentation                                                    |
| ---------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Breadcrumb | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FBreadcrumb) | [Documentation](http://bulma.io/documentation/components/breadcrumb/)  |
| Card       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FCard)       | [Documentation](http://bulma.io/documentation/components/card/)        |
| Dropdown   | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FDropdown)   | [Documentation](http://bulma.io/documentation/components/dropdown/)    |
| Menu       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FMenu)       | [Documentation](http://bulma.io/documentation/components/menu/)        |
| Message    | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FMessage)    | [Documentation](http://bulma.io/documentation/components/message/)     |
| Modal      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FModal)      | [Documentation](http://bulma.io/documentation/components/modal/)       |
| Navbar     | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FNavbar)     | [Documentation](https://bulma.io/documentation/components/navbar/)     |
| Pagination | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FPagination) | [Documentation](https://bulma.io/documentation/components/pagination/) |
| Panel      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FPanel)      | [Documentation](https://bulma.io/documentation/components/panel/)      |
| Tabs       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FTabs)       | [Documentation](https://bulma.io/documentation/components/tabs/)       |

#### Extras

| Item    | Storybook                                                            | Bulma Documentation |
| ------- | -------------------------------------------------------------------- | ------------------- |
| Generic | [Stories](https://dfee.github.io/rbx/?selectedKind=Extras%2FGeneric) | N/A                 |
| Loader  | [Stories](https://dfee.github.io/rbx/?selectedKind=Extras%2FLoader)  | N/A                 |

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
