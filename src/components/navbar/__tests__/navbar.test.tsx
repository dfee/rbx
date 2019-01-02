import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "../../../base/helpers";
import { Navbar } from "../navbar";
import { NavbarBrand } from "../navbar-brand";
import { NavbarBurger } from "../navbar-burger";
import { NAVBAR_FIXED_ALIGNMENTS, NavbarContainer } from "../navbar-container";
import { NavbarContext } from "../navbar-context";
import { NavbarDivider } from "../navbar-divider";
import { NavbarDropdown } from "../navbar-dropdown";
import { NavbarEnd } from "../navbar-end";
import { NavbarItem } from "../navbar-item";
import { NavbarLink } from "../navbar-link";
import { NavbarMenu } from "../navbar-menu";
import { NavbarStart } from "../navbar-start";

import {
  hasProperties,
  makeNodeFactory,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Navbar;
const COMPONENT_NAME = "Navbar";
const DEFAULT_ELEMENT = "nav";
// const BULMA_CLASS_NAME = "navbar";

const makeNode = makeNodeFactory(Navbar);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Container: NavbarContainer,
    Context: NavbarContext,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    End: NavbarEnd,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Start: NavbarStart,
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

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color =>
        test(`it forwards color: ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().color).toBe(color);
        }),
      );
    });

    describe("fixed", () => {
      validateOneOfPropType(propTypes, "fixed", NAVBAR_FIXED_ALIGNMENTS);

      NAVBAR_FIXED_ALIGNMENTS.map(fixed =>
        test(`it forwards fixed: ${fixed}`, () => {
          const node = makeNode({ fixed });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().fixed).toBe(fixed);
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

    describe("transparent", () => {
      validateBoolPropType(propTypes, "transparent");

      [false, true].map(transparent =>
        test(`it forwards transparent: ${transparent}`, () => {
          const node = makeNode({ transparent });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().transparent).toBe(transparent);
        }),
      );
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
