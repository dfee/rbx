import React from "react";
import { TableCell } from "src/elements/table/table-cell";

import {
  hasProperties,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableCell;
const DISPLAY_NAME = "Table.Cell";
const DEFAULT_ELEMENT = "td";
const BULMA_CLASS_NAME = undefined;

const makeNode = (props: any) => (
  <table>
    <tbody>
      <tr>
        <TableCell {...props} />
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
