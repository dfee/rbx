import { BUTTON_GROUP_POSITIONS, ButtonGroup } from "../button-group";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = ButtonGroup;
const COMPONENT_NAME = "ButtonGroup";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "buttons";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("hasAddons", () => {
      validateBoolPropType(propTypes, "hasAddons");

      [false, true].map(hasAddons =>
        it(`should ${hasAddons ? "" : "not "}have addons`, () => {
          const node = makeNode({ hasAddons });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("has-addons")).toBe(hasAddons);
        }),
      );
    });

    describe("position", () => {
      validateOneOfPropType(propTypes, "position", BUTTON_GROUP_POSITIONS);

      BUTTON_GROUP_POSITIONS.map(position =>
        it(`should be ${position}`, () => {
          const node = makeNode({ position });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${position}`)).toBe(true);
        }),
      );
    });
  });
});
