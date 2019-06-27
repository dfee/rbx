import * as React from "react";

import {
  NAVBAR_SEGMENT_DEFAULTS,
  NavbarSegment,
  NavbarSegmentProps,
} from "src/components/navbar/navbar-segment";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

import {
  makeShallowWrapperInNavbarContextFactory,
  makeReactWrapperInNavbarContextFactory,
} from "./testing";

const COMPONENT = NavbarSegment;
const DISPLAY_NAME = "Navbar.Segment";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "navbar-";

const makeNode = (props: Partial<NavbarSegmentProps>) => {
  const propsWithDefaults = {
    align: "start" as NavbarSegmentProps["align"],
    ...props,
  };

  return <NavbarSegment {...propsWithDefaults} />;
};

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: NAVBAR_SEGMENT_DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: "navbar-start",
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeNode,
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeNode,
    makeReactWrapper: makeReactWrapperInNavbarContextFactory(),
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperInNavbarContextFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      NAVBAR_SEGMENT_DEFAULTS.alignments.forEach(align => {
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`navbar-${align}`)).toBe(true);
        });
      });
    });
  });
});
