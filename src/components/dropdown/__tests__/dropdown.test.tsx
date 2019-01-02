import Enzyme from "enzyme";
import React from "react";

import { Dropdown } from "../dropdown";
import { DROPDOWN_ALIGNMENTS, DropdownContainer } from "../dropdown-container";
import { DropdownContent } from "../dropdown-content";
import { DropdownContext } from "../dropdown-context";
import { DropdownDivider } from "../dropdown-divider";
import { DropdownItem } from "../dropdown-item";
import { DropdownMenu } from "../dropdown-menu";
import { DropdownTrigger } from "../dropdown-trigger";

import {
  hasProperties,
  makeNodeFactory,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
    const { propTypes } = COMPONENT;

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

    describe("align", () => {
      validateOneOfPropType(propTypes, "align", DROPDOWN_ALIGNMENTS);

      DROPDOWN_ALIGNMENTS.map(align =>
        test(`it forwards align: ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().align).toBe(align);
        }),
      );
    });

    describe("as", () => {
      test("it forwards", () => {
        const as = () => <div />;
        const node = makeNode({ as });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().as).toBe(as);
      });
    });

    describe("clasaName", () => {
      test("it forwards", () => {
        const className = "foo";
        const node = makeNode({ className });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().className).toBe(className);
      });
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

    describe("ref", () => {
      test("it forwards", () => {
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ ref });
        const wrapper = Enzyme.shallow(node);
        expect(wrapper.props().innerRef).toBe(ref);
      });
    });

    describe("up", () => {
      validateBoolPropType(propTypes, "up");

      [false, true].map(up =>
        test(`it forwards up: ${up}`, () => {
          const node = makeNode({ up });
          const wrapper = Enzyme.shallow(node);
          expect(wrapper.props().up).toBe(up);
        }),
      );
    });
  });
});
