import * as React from "react";

import { PanelTab } from "src/components/panel/panel-tab";
import { PanelTabGroup } from "src/components/panel/panel-tab-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = PanelTab;
const DISPLAY_NAME = "Panel.Tab";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Group: PanelTabGroup,
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
          const node = <PanelTab active={active} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
