import Enzyme from "enzyme";
import React from "react";

import { Radio } from "../radio";

import { hasProperties } from "@/__tests__/helpers";

describe("Radio component", () => {
  hasProperties(Radio, {
    defaultProps: undefined,
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Radio />);
    expect(wrapper.is("input")).toBe(true);
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
});
