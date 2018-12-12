import Enzyme from "enzyme";
import React from "react";

import { Select } from "../select";
import { SelectContainer } from "../select-container";
import { SelectOption } from "../select-option";

import { hasProperties } from "@/__tests__/helpers";

describe("Select component", () => {
  hasProperties(Select, {
    Container: SelectContainer,
    Option: SelectOption,
    defaultProps: undefined,
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Select />);
    expect(wrapper.is("select")).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSelectElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Select ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("select").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Select className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
