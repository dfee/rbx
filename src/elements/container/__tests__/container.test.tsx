import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Container } from "src/elements/container/container";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Container;
const DISPLAY_NAME = "Container";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "container";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("breakpoint", () => {
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.forEach(breakpoint => {
        it(`should be ${breakpoint}`, () => {
          const node = <Container breakpoint={breakpoint} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        });
      });
    });

    describe("fluid", () => {
      validateBoolPropType(propTypes, "fluid");

      [false, true].forEach(fluid => {
        it(`should ${fluid ? "" : "not "}be fluid`, () => {
          const node = <Container fluid={fluid} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fluid")).toBe(fluid);
        });
      });
    });
  });
});
