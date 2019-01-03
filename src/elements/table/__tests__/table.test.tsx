import { Table } from "src/elements/table/table";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = Table;
const COMPONENT_NAME = "Table";
const DEFAULT_ELEMENT = "table";
const BULMA_CLASS_NAME = "table";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("bordered", () => {
      validateBoolPropType(propTypes, "bordered");

      [false, true].map(bordered => {
        it(`should ${bordered ? "" : "not "}be bordered`, () => {
          const node = makeNode({ bordered });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-bordered")).toBe(bordered);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = makeNode({ hoverable });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });

    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].map(narrow => {
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = makeNode({ narrow });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });
    });

    describe("striped", () => {
      validateBoolPropType(propTypes, "striped");

      [false, true].map(striped => {
        it(`should ${striped ? "" : "not "}be striped`, () => {
          const node = makeNode({ striped });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-striped")).toBe(striped);
        });
      });
    });
  });
});
