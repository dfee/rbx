import Enzyme from "enzyme";
import React from "react";

import { Tab } from "../tab";

import { hasProperties } from "@/__tests__/helpers";

describe("Tab component", () => {
  hasProperties(Tab, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Tab />);
    expect(wrapper.children().is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Tab as={as} />);
    expect(wrapper.children().is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Tab ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("li a").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Tab className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should pass custom style to li", () => {
    const wrapper = Enzyme.shallow(<Tab style={{ margin: "10px" }} />);
    expect(wrapper.find("li").prop("style")).toHaveProperty("margin", "10px");
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}be active`, () => {
      const wrapper = Enzyme.shallow(<Tab active={active} />);
      expect(wrapper.hasClass("is-active")).toBe(active);
    }),
  );
});
