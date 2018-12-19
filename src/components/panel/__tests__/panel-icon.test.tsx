import Enzyme from "enzyme";
import React from "react";

import { PanelIcon } from "../panel-icon";

import { hasProperties } from "@/__tests__/testing";

describe("PanelIcon component", () => {
  hasProperties(PanelIcon, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PanelIcon />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<PanelIcon as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PanelIcon ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".panel-icon").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PanelIcon />);
    expect(wrapper.hasClass("panel-icon")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PanelIcon className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
