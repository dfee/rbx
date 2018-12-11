import Enzyme from "enzyme";
import React from "react";

import { PanelTab } from "../panel-tab";
import { PanelTabs } from "../panel-tabs";

import { hasProperties } from "@/__tests__/helpers";

describe("PanelTabs component", () => {
  hasProperties(PanelTabs, {
    Tab: PanelTab,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PanelTabs />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PanelTabs as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PanelTabs ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".panel-tabs").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PanelTabs className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
