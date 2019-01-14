import * as Enzyme from "enzyme";
import * as React from "react";

import {
  hasProperties,
  makeNodeFactory,
  makeTestPropForwarding,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";
import { NavbarItem } from "src/components/navbar/navbar-item";
import { NavbarItemContainer } from "src/components/navbar/navbar-item-container";

const COMPONENT = NavbarItem;
const COMPONENT_NAME = "NavbarItem";
const DEFAULT_ELEMENT = "a";
// const BULMA_CLASS_NAME = "navbar-item";

const makeNode = makeNodeFactory(NavbarItem);

const testPropForwarding = makeTestPropForwarding(makeNode);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Container: NavbarItemContainer,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  test("it renders a NavbarItemContainer", () => {
    const node = makeNode({});
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(NavbarItemContainer)).toBe(true);
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("as", () => {
      testPropForwarding("as", "div");
    });

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        testPropForwarding("active", active);
      });
    });

    describe("dropdown", () => {
      validateBoolPropType(propTypes, "dropdown");

      [false, true].map(dropdown => {
        testPropForwarding("dropdown", dropdown);
      });
    });

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].map(expanded => {
        testPropForwarding("expanded", expanded);
      });
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");
      [false, true].map(hoverable => {
        testPropForwarding("hoverable", hoverable);
      });
    });

    describe("managed", () => {
      validateBoolPropType(propTypes, "managed");

      [false, true].map(managed => {
        testPropForwarding("managed", managed);
      });
    });

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => undefined, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      testPropForwarding("onClick", () => undefined);
    });

    describe("ref", () => {
      testPropForwarding("ref", React.createRef(), "innerRef");
    });

    describe("tab", () => {
      validateBoolPropType(propTypes, "tab");

      [false, true].map(tab => {
        testPropForwarding("tab", tab);
      });
    });

    describe("up", () => {
      validateBoolPropType(propTypes, "up");

      [false, true].map(up => {
        testPropForwarding("up", up);
      });
    });
  });
});
