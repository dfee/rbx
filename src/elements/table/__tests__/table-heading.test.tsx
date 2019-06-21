import React from "react";

import { TableHeading } from "src/elements/table/table-heading";
import {
  hasProperties,
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableHeading;
const DISPLAY_NAME = "Table.Heading";
const DEFAULT_ELEMENT = "th";
const BULMA_CLASS_NAME = undefined;

// todo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeNode = (props: any) => (
  <table>
    <tbody>
      <tr>
        <TableHeading {...props} />
      </tr>
    </tbody>
  </table>
);

const makeWrappingNode = (node: React.ReactNode) => (
  <table>
    <tbody>
      <tr>{node}</tr>
    </tbody>
  </table>
);

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeWrappingNode,
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeReactWrapper: makeReactWrapperFactory(
      wrapper =>
        wrapper // table
          .children() // tbody
          .children() // tr
          .children() // Component
          .children() // Generic
          .children(), // Leaf ("as")
    ),
    makeShallowWrapper: makeShallowWrapperFactory(
      wrapper =>
        wrapper // table
          .children() // tbody
          .children() // tr
          .children() // Component
          .dive() // Generic
          .dive(), // Leaf ("as")
    ),
  });
});
