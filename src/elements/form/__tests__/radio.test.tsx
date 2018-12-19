import Enzyme from "enzyme";
import React from "react";

import { Radio } from "../radio";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("Radio component", () => {
  hasProperties(Radio, {
    defaultProps: { as: "input" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Radio />);
    expect(wrapper.is("input")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Radio as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Radio ref={ref} />
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
    const wrapper = Enzyme.shallow(<Radio className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Radio;
    testGenericPropTypes(propTypes);
  });
});
