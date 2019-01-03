import * as Enzyme from "enzyme";
import * as React from "react";

import { Dropdown } from "src/components/dropdown/dropdown";
import {
  DROPDOWN_ALIGNMENTS,
  DropdownContainer,
} from "src/components/dropdown/dropdown-container";
import { DropdownContent } from "src/components/dropdown/dropdown-content";
import { DropdownContext } from "src/components/dropdown/dropdown-context";
import { DropdownDivider } from "src/components/dropdown/dropdown-divider";
import { DropdownItem } from "src/components/dropdown/dropdown-item";
import { DropdownMenu } from "src/components/dropdown/dropdown-menu";
import { DropdownTrigger } from "src/components/dropdown/dropdown-trigger";

import {
  hasProperties,
  makeNodeFactory,
  makeTestPropForwarding,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Dropdown;
const COMPONENT_NAME = "Dropdown";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "dropdown";

const makeNode = makeNodeFactory(Dropdown);

const testPropForwarding = makeTestPropForwarding(makeNode);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Container: DropdownContainer,
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  test("it renders a DropdownContainer", () => {
    const node = makeNode({});
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(DropdownContainer)).toBe(true);
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        testPropForwarding("active", active);
      });
    });

    describe("align", () => {
      validateOneOfPropType(propTypes, "align", DROPDOWN_ALIGNMENTS);

      DROPDOWN_ALIGNMENTS.map(align => {
        testPropForwarding("align", align);
      });
    });

    describe("as", () => {
      testPropForwarding("as", "div");
    });

    describe("className", () => {
      testPropForwarding("className", "foo");
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

    describe("ref", () => {
      testPropForwarding("ref", React.createRef(), "innerRef");
    });

    describe("up", () => {
      validateBoolPropType(propTypes, "up");

      [false, true].map(up => {
        testPropForwarding("up", up);
      });
    });
  });
});
