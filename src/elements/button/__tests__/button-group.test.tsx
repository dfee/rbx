import Enzyme from "enzyme";
import React from "react";

import { BUTTON_GROUP_POSITIONS, ButtonGroup } from "../button-group";

import {
  describeExoticPropTypes,
  hasProperties,
  validatePropTypes,
} from "@/__tests__/helpers";

describe("ButtonGroup component", () => {
  hasProperties(ButtonGroup, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ButtonGroup />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ButtonGroup as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ButtonGroup ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".buttons").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ButtonGroup />);
    expect(wrapper.hasClass("buttons")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ButtonGroup className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should have addons", () => {
    const wrapper = Enzyme.shallow(<ButtonGroup hasAddons />);
    expect(wrapper.hasClass("has-addons")).toBe(true);
  });

  BUTTON_GROUP_POSITIONS.map(position =>
    it(`should be ${position}`, () => {
      const wrapper = Enzyme.shallow(<ButtonGroup position={position} />);
      expect(wrapper.hasClass(`is-${position}`)).toBe(true);
    }),
  );

  describeExoticPropTypes(ButtonGroup.propTypes);

  describe("propTypes", () => {
    const propTypes = ButtonGroup.propTypes;

    validatePropTypes(propTypes, "hasAddons", [
      ...[false, true].map(value => ({ value, valid: true })),
      { value: "other", valid: false },
    ]);

    validatePropTypes(propTypes, "position", [
      ...BUTTON_GROUP_POSITIONS.map(value => ({ value, valid: true })),
      { value: "other", valid: false },
    ]);
  });
});
