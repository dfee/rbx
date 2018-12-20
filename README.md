## 👟 rbx – The Comprehensive Bulma UI Framework for React

[![Build Status](https://travis-ci.org/dfee/rbx.svg?branch=master)](https://travis-ci.org/dfee/rbx)
[![Coverage Status](https://coveralls.io/repos/github/dfee/rbx/badge.svg?branch=master)](https://coveralls.io/github/dfee/rbx?branch=master)
[![Release Version](https://img.shields.io/github/release/dfee/rbx.svg)](https://github.com/dfee/rbx)
[![Npm Downloads](https://img.shields.io/npm/dm/rbx.svg)](https://www.npmjs.com/package/rbx)

`rbx` is a comprehensive library of React components for [Bulma 0.7.2](http://bulma.io).

🔥 **All components have exhaustive** [storybook examples](https://dfee.github.io/rbx).

🙃 _I'll wait, go check them out!_

### To Install

`npm install rbx bulma@0.7.2` or `yarn add rbx bulma@0.7.2`

### To Use

Follow the instructions below for adding `sass` support to your webpack configuration, and then:

```tsx
import React from "react";
import { Columns } from "rbx";
/**
 * Alternatively, you can import only the components you need
 */
import { Columns } from "rbx/grid/columns";

export const MyPage = () => (
  <Columns>
    <Columns.Column>First Column</Columns.Column>
    <Columns.Column>Second Column</Columns.Column>
    <Columns.Column>Third Column</Columns.Column>
    <Columns.Column>Fourth Column</Columns.Column>
  </Columns>
);
```

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

For styling, each component imports its own sass file.
Thus, you can reduce your css total file size by only including the styles that you will use.
To enable this, configure your [Webpack](https://webpack.github.io/) to handle sass files.

While some components may slightly differ from the Bulma API, these changes are usually minimal.

#### Base

| Item    | Storybook                                                            | Bulma Documentation |
| ------- | -------------------------------------------------------------------- | ------------------- |
| Generic | [Stories](https://dfee.github.io/rbx/?selectedKind=Extras%2FGeneric) | N/A                 |

#### Components

| Item       | Storybook                                                                   | Bulma Documentation                                                    |
| ---------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Breadcrumb | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FBreadcrumb) | [Documentation](http://bulma.io/documentation/components/breadcrumb/)  |
| Card       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FCard)       | [Documentation](http://bulma.io/documentation/components/card/)        |
| Dropdown   | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FDropdown)   | [Documentation](http://bulma.io/documentation/components/dropdown/)    |
| Level      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FLevel)      | [Documentation](http://bulma.io/documentation/layout/level/)           |
| List       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FList)       | [Documentation](http://bulma.io/documentation/components/list/)        |
| Media      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FMedia)      | [Documentation](http://bulma.io/documentation/layout/media-object/)    |
| Menu       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FMenu)       | [Documentation](http://bulma.io/documentation/components/menu/)        |
| Message    | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FMessage)    | [Documentation](http://bulma.io/documentation/components/message/)     |
| Modal      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FModal)      | [Documentation](http://bulma.io/documentation/components/modal/)       |
| Navbar     | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FNavbar)     | [Documentation](https://bulma.io/documentation/components/navbar/)     |
| Pagination | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FPagination) | [Documentation](https://bulma.io/documentation/components/pagination/) |
| Panel      | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FPanel)      | [Documentation](https://bulma.io/documentation/components/panel/)      |
| Tabs       | [Stories](https://dfee.github.io/rbx/?selectedKind=Components%2FTabs)       | [Documentation](https://bulma.io/documentation/components/tabs/)       |

#### Elements

| Item         | Storybook                                                                   | Bulma Documentation                                                   |
| ------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Box          | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FBox)          | [Documentation](http://bulma.io/documentation/elements/box/)          |
| Button       | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FButton)       | [Documentation](http://bulma.io/documentation/elements/button/)       |
| Container    | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FContainer)    | [Documentation](http://bulma.io/documentation/layout/container/)      |
| Content      | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FContent)      | [Documentation](http://bulma.io/documentation/elements/content/)      |
| Form         | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FForm)         | [Documentation](http://bulma.io/documentation/form/general/)          |
| Icon         | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FIcon)         | [Documentation](http://bulma.io/documentation/elements/icon/)         |
| Image        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FImage)        | [Documentation](http://bulma.io/documentation/elements/image/)        |
| Notification | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FNotification) | [Documentation](http://bulma.io/documentation/elements/notification/) |
| Other        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FOther)        | N/A                                                                   |
| Progress     | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FProgress)     | [Documentation](http://bulma.io/documentation/elements/progress/)     |
| Table        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTable)        | [Documentation](http://bulma.io/documentation/elements/table/)        |
| Tag          | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTag)          | [Documentation](http://bulma.io/documentation/elements/tag/)          |
| Title        | [Stories](https://dfee.github.io/rbx/?selectedKind=Elements%2FTitle)        | [Documentation](http://bulma.io/documentation/elements/title/)        |

#### Grid

| Item    | Storybook                                                          | Bulma Documentation                                          |
| ------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| Columns | [Stories](https://dfee.github.io/rbx/?selectedKind=Grid%2FColumns) | [Documentation](http://bulma.io/documentation/columns/)      |
| Tiles   | [Stories](https://dfee.github.io/rbx/?selectedKind=Grid%2FTiles)   | [Documentation](http://bulma.io/documentation/layout/tiles/) |

#### Layout

| Item    | Storybook                                                            | Bulma Documentation                                            |
| ------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| Footer  | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FFooter)  | [Documentation](http://bulma.io/documentation/layout/footer/)  |
| Hero    | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FHero)    | [Documentation](http://bulma.io/documentation/layout/hero/)    |
| Section | [Stories](https://dfee.github.io/rbx/?selectedKind=Layout%2FSection) | [Documentation](http://bulma.io/documentation/layout/section/) |

### Styling

#### SASS Support

To override the variables set by Bulma, [follow the Bulma instructions](https://bulma.io/documentation/customize/variables/).

You will also need to import `rbx/index.sass` as it contains any pertinent bug fixes for Bulma.

A minimal example of `style.sass` might look like:

```sass
$primary: #61dafb

@import "~bulma/bulma.sass"
@import "../src/index.sass"
```

Then, import this file into the root of your project.

#### Create React App

Create React App 2 supports SASS compilation out of the box.

To get started, please follow the [official instructions](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet) to enable this feature.

Then, create a SASS file in your project (as described above):

Finally, import this stylesheet somewhere in your CRA app.

```js
import "./App.sass";
```

#### Etc.

This library was hard-forked from [`react-bulma-components`](https://github.com/couds/react-bulma-components) and has been rewritten in its entirety from scratch.

If you're coming from that library, expect some breaking changes - largely due to stylistic interpretations of the Bulma API and a propensity to keep the React component names semantic.
In addition, there were **many** additions and bug fixes required to bring this library into compliance with the latest release of Bulma.
