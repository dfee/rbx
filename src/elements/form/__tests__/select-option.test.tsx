import Enzyme from "enzyme";
import React from "react";

import { SelectOption } from "../select-option";

import { hasProperties } from "@/__tests__/helpers";

describe("SelectOption component", () => {
  hasProperties(SelectOption, {
    defaultProps: undefined,
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<SelectOption />);
    expect(wrapper.is("option")).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLOptionElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <SelectOption ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("option").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<SelectOption className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
