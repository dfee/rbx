import Enzyme from "enzyme";
import React from "react";

import { DropdownDivider } from "../dropdown-divider";

import { hasProperties } from "@/__tests__/helpers";

describe("DropdownDivider component", () => {
  hasProperties(DropdownDivider, {
    defaultProps: undefined,
  });

  it("should render as the default component", () => {
    const wrapper = Enzyme.shallow(<DropdownDivider />);
    expect(wrapper.is("hr")).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLHRElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <DropdownDivider ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".dropdown-divider").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<DropdownDivider />);
    expect(wrapper.hasClass("dropdown-divider")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<DropdownDivider className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
