import React from "react";
import { TableFoot } from "src/elements/table/table-foot";

import {
  hasProperties,
  makeShallowWrapperFactory,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableFoot;
const DISPLAY_NAME = "Table.Foot";
const DEFAULT_ELEMENT = "tfoot";
const BULMA_CLASS_NAME = undefined;

const makeNode = (props: any) => (
  <table>
    <TableFoot {...props} />
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
