import React from "react";
import { TableCell } from "src/elements/table/table-cell";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  makeGenericHOCShallowWrapperInContextConsumer,
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

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].map(narrow => {
        it(`should ${narrow ? "" : "not "} be bordered`, () => {
          const node = <TableCell narrow={narrow} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });
    });

    describe("selected", () => {
      validateBoolPropType(propTypes, "selected");

      [false, true].map(selected => {
        it(`should ${selected ? "" : "not "} be bordered`, () => {
          const node = <TableCell selected={selected} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-selected")).toBe(selected);
        });
      });
    });
  });
});
