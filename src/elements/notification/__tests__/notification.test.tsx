import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "../../../base/helpers";
import { Notification } from "../notification";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("Notification component", () => {
  hasProperties(Notification, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Notification />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Notification as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Notification ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".notification").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Notification />);
    expect(wrapper.hasClass("notification")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Notification className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Notification color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Notification;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "color", COLORS);
  });
});
