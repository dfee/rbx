import * as React from "react";

import { PanelBlock } from "src/components/panel/panel-block";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = PanelBlock;
const DISPLAY_NAME = "Panel.Block";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "panel-block";

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

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].forEach(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <PanelBlock active={active} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
