import React from "react";
import { TableBody } from "src/elements/table/table-body";

import {
  hasProperties,
  makeShallowWrapperFactory,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableBody;
const DISPLAY_NAME = "Table.Body";
const DEFAULT_ELEMENT = "tbody";
const BULMA_CLASS_NAME = undefined;

const makeNode = (props: any) => (
  <table>
    <TableBody {...props} />
  </table>
);

const makeWrappingNode = (node: React.ReactNode) => <table>{node}</table>;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeWrappingNode,
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeReactWrapper: makeReactWrapperFactory(
      wrapper =>
        wrapper // table
          .children() // Component
          .children() // Generic
          .children(), // Leaf ("as")
    ),
    makeShallowWrapper: makeShallowWrapperFactory(
      wrapper =>
        wrapper // table
          .children() // Component
          .dive() // Generic
          .dive(), // Leaf ("as")
    ),
  });
});
