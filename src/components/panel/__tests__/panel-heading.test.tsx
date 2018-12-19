import Enzyme from "enzyme";
import React from "react";

import { PanelHeading } from "../panel-heading";

import { hasProperties } from "@/__tests__/testing";

describe("PanelHeading component", () => {
  hasProperties(PanelHeading, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PanelHeading />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PanelHeading as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PanelHeading ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".panel-heading").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PanelHeading />);
    expect(wrapper.hasClass("panel-heading")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PanelHeading className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
