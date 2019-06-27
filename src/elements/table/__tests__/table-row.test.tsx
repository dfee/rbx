import * as React from "react";

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

// todo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeNode = (props: any) => (
  <table>
    <tbody>
      <TableRow {...props} />
    </tbody>
  </table>
);

const makeWrappingNode = (node: React.ReactNode) => (
  <table>
    <tbody>{node}</tbody>
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
          .children() // Component
          .children() // Generic
          .children(), // Leaf ("as")
    ),
    makeShallowWrapper: makeShallowWrapperFactory(
      wrapper =>
        wrapper // table
          .children() // tbody
          .children() // Component
          .dive() // Generic
          .dive(), // Leaf ("as")
    ),
  });

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("selected", () => {
      validateBoolPropType(propTypes, "selected");

      [false, true].forEach(selected => {
        it(`should ${selected ? "" : "not "}be selected`, () => {
          const node = <TableRow selected={selected} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-selected")).toBe(selected);
        });
      });
    });
  });
});
