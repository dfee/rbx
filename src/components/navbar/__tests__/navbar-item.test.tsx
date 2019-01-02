import Enzyme from "enzyme";
import React from "react";

import {
  hasProperties,
  makeNodeFactory,
  validateBoolPropType,
  validatePropType,
} from "../../../__tests__/testing";
import { NavbarItem } from "../navbar-item";
import { NavbarItemContainer } from "../navbar-item-container";

const COMPONENT = NavbarItem;
const COMPONENT_NAME = "NavbarItem";
const DEFAULT_ELEMENT = "a";
// const BULMA_CLASS_NAME = "navbar-item";

const makeNode = makeNodeFactory(NavbarItem);

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
      test("it forwards", () => {
        const as = () => <div />;
        const node = makeNode({ as });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().as).toBe(as);
      });
    });

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active =>
        test(`it forwards active: ${active}`, () => {
          const node = makeNode({ active });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().active).toBe(active);
        }),
      );
    });

    describe("dropdown", () => {
      validateBoolPropType(propTypes, "dropdown");

      [false, true].map(dropdown =>
        test(`it forwards dropdown: ${dropdown}`, () => {
          const node = makeNode({ dropdown });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().dropdown).toBe(dropdown);
        }),
      );
    });

    describe("dropdownUp", () => {
      validateBoolPropType(propTypes, "dropdownUp");

      [false, true].map(dropdownUp =>
        test(`it forwards dropdownUp: ${dropdownUp}`, () => {
          const node = makeNode({ dropdownUp });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().dropdownUp).toBe(dropdownUp);
        }),
      );
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable =>
        test(`it forwards hoverable: ${hoverable}`, () => {
          const node = makeNode({ hoverable });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().hoverable).toBe(hoverable);
        }),
      );
    });

    describe("managed", () => {
      validateBoolPropType(propTypes, "managed");

      [false, true].map(managed =>
        test(`it forwards managed: ${managed}`, () => {
          const node = makeNode({ managed });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().managed).toBe(managed);
        }),
      );
    });

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => null, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      test("it forwards onClick", () => {
        const onClick = jest.fn();
        const node = makeNode({ onClick });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().onClick).toBe(onClick);
      });
    });

    describe("ref", () => {
      test("it forwards", () => {
        const ref = React.createRef<HTMLAnchorElement>();
        const node = makeNode({ ref });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().innerRef).toBe(ref);
      });
    });
  });
});
