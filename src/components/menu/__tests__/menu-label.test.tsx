import Enzyme from "enzyme";
import React from "react";

import { MenuLabel } from "../menu-label";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("MenuLabel component", () => {
  hasProperties(MenuLabel, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<MenuLabel />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<MenuLabel as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <MenuLabel ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".menu-label").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<MenuLabel />);
    expect(wrapper.hasClass("menu-label")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<MenuLabel className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = MenuLabel;
    testGenericPropTypes(propTypes);
  });
});
