import React from "react";
import { TableCell } from "src/elements/table/table-cell";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = TableCell;
const DISPLAY_NAME = "Table.Cell";
const DEFAULT_ELEMENT = "td";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeWrappingNode: node => (
      <table>
        <tbody>
          <tr children={node} />
        </tbody>
      </table>
    ),
  });

  testThemeIntegration(COMPONENT);
});
