import React from "react";
import { TableHeading } from "src/elements/table/table-heading";

import {
  hasProperties,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableHeading;
const DISPLAY_NAME = "Table.Heading";
const DEFAULT_ELEMENT = "th";
const BULMA_CLASS_NAME = undefined;

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
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeWrappingNode,
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeReactWrapper: makeReactWrapperFactory(5),
  });
});
