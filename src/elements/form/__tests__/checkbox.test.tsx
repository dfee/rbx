import Enzyme from "enzyme";
import React from "react";

import { Checkbox } from "../checkbox";

import { hasProperties } from "@/__tests__/helpers";

describe("Checkbox component", () => {
  hasProperties(Checkbox, {
    defaultProps: { as: "input" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Checkbox />);
    expect(wrapper.is("input")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Checkbox as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Checkbox ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("input").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Checkbox className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
