import Enzyme from "enzyme";
import React from "react";

import { Dropdown } from "../dropdown";
import { DropdownContainer } from "../dropdown-container";
import { DropdownContent } from "../dropdown-content";
import { DropdownContext } from "../dropdown-context";
import { DropdownDivider } from "../dropdown-divider";
import { DropdownItem } from "../dropdown-item";
import { DropdownMenu } from "../dropdown-menu";
import { DropdownTrigger } from "../dropdown-trigger";

import { hasProperties, makeNodeFactory } from "../../../__tests__/testing";

const COMPONENT = Dropdown;
const COMPONENT_NAME = "Dropdown";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "dropdown";

const makeNode = makeNodeFactory(Dropdown);

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
    describe("ref", () => {
      test("it forwards", () => {
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ ref });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().innerRef).toBe(ref);
      });
    });

    describe("as", () => {
      test("it forwards", () => {
        const as = () => <div />;
        const node = makeNode({ as });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().as).toBe(as);
      });
    });
  });
});
