import Enzyme from "enzyme";
import React from "react";

import { LevelLeft } from "../level-left";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("LevelLeft component", () => {
  // todo: LevelSide
  hasProperties(LevelLeft, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<LevelLeft />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<LevelLeft as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <LevelLeft ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".level-left").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<LevelLeft />);
    expect(wrapper.hasClass("level-left")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<LevelLeft className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = LevelLeft;
    testGenericPropTypes(propTypes);
  });
});
