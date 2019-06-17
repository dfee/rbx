import React from "react";
import { TableRow } from "src/elements/table/table-row";

import {
  hasProperties,
  makeShallowWrapperFactory,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = TableRow;
const DISPLAY_NAME = "Table.Row";
const DEFAULT_ELEMENT = "tr";
const BULMA_CLASS_NAME = undefined;

const makeNode = (props: any) => (
  <table>
    <tbody>
      <TableRow {...props} />
    </tbody>
  </table>
);

const makeWrappingNode = (node: React.ReactNode) => (
  <table>
    <tbody children={node} />
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
    makeReactWrapper: makeReactWrapperFactory(4),
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("selected", () => {
      validateBoolPropType(propTypes, "selected");

      [false, true].map(selected => {
        it(`should ${selected ? "" : "not "}be selected`, () => {
          const node = <TableRow selected={selected} />;
          const wrapper = makeShallowWrapper({
            Component: COMPONENT,
            node,
          });
          expect(wrapper.hasClass("is-selected")).toBe(selected);
        });
      });
    });
  });
});
