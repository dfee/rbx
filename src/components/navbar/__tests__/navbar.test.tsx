import * as Enzyme from "enzyme";
import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Navbar } from "src/components/navbar/navbar";
import { NavbarBrand } from "src/components/navbar/navbar-brand";
import { NavbarBurger } from "src/components/navbar/navbar-burger";
import {
  NAVBAR_DEFAULTS,
  NavbarContainer,
} from "src/components/navbar/navbar-container";
import { NavbarContext } from "src/components/navbar/navbar-context";
import { NavbarDivider } from "src/components/navbar/navbar-divider";
import { NavbarDropdown } from "src/components/navbar/navbar-dropdown";
import { NavbarItem } from "src/components/navbar/navbar-item";
import { NavbarLink } from "src/components/navbar/navbar-link";
import { NavbarMenu } from "src/components/navbar/navbar-menu";
import { NavbarSegment } from "src/components/navbar/navbar-segment";

import {
  hasProperties,
  makeNodeFactory,
  makeTestPropForwarding,
  validateBoolPropType,
  validatePropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Navbar;
const COMPONENT_NAME = "Navbar";
const DEFAULT_ELEMENT = "nav";
// const BULMA_CLASS_NAME = "navbar";

const makeNode = makeNodeFactory(Navbar);
const testPropForwarding = makeTestPropForwarding(makeNode);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Container: NavbarContainer,
    Context: NavbarContext,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Segment: NavbarSegment,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  test("it renders a NavbarContainer", () => {
    const node = makeNode({});
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(NavbarContainer)).toBe(true);
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

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        testPropForwarding("color", color);
      });
    });

    describe("document", () => {
      validatePropType(propTypes, "document", [
        { value: document, valid: true, descriptor: "obj" },
        { value: "string", valid: false },
      ]);

      testPropForwarding("document", document);
    });

    describe("fixed", () => {
      validateStringOrNumberPropType(propTypes, "fixed");

      NAVBAR_DEFAULTS.fixedAlignments.map(fixed => {
        testPropForwarding("fixed", fixed);
      });
    });

    describe("managed", () => {
      validateBoolPropType(propTypes, "managed");

      [false, true].map(managed => {
        testPropForwarding("managed", managed);
      });
    });

    describe("transparent", () => {
      validateBoolPropType(propTypes, "transparent");

      [false, true].map(transparent => {
        testPropForwarding("transparent", transparent);
      });
    });

    describe("ref", () => {
      testPropForwarding("ref", React.createRef(), "innerRef");
    });
  });
});
