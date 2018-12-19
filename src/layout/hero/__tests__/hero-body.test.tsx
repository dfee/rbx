import Enzyme from "enzyme";
import React from "react";

import { HeroBody } from "../hero-body";

import { hasProperties } from "@/__tests__/testing";

describe("HeroBody component", () => {
  hasProperties(HeroBody, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<HeroBody />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<HeroBody as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <HeroBody ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".hero-body").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<HeroBody />);
    expect(wrapper.hasClass("hero-body")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<HeroBody className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
