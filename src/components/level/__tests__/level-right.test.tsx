import Enzyme from "enzyme";
import React from "react";

import { LevelRight } from "../level-right";

import { hasProperties } from "@/__tests__/helpers";

describe("LevelRight component", () => {
  hasProperties(LevelRight, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<LevelRight />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<LevelRight as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <LevelRight ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".level-right").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<LevelRight />);
    expect(wrapper.hasClass("level-right")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<LevelRight className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
