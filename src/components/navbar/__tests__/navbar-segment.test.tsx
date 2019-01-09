import React from "react";

import {
  NAVBAR_SEGMENT_DEFAULTS,
  NavbarSegment,
  NavbarSegmentProps,
} from "src/components/navbar/navbar-segment";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = NavbarSegment;
const COMPONENT_NAME = "NavbarSegment";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "navbar-";

const makeNode = (props: Partial<NavbarSegmentProps>) => {
  const propsWithDefaults = {
    align: "start" as NavbarSegmentProps["align"],
    ...props,
  };

  return <NavbarSegment {...propsWithDefaults} />;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    "navbar-start",
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      NAVBAR_SEGMENT_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`navbar-${align}`)).toBe(true);
        });
      });
    });
  });
});
