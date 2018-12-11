import Enzyme from "enzyme";
import React from "react";

import { PanelBlock } from "../panel-block";

import { hasProperties } from "@/__tests__/helpers";

describe("PanelBlock component", () => {
  hasProperties(PanelBlock, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PanelBlock />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PanelBlock as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PanelBlock ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".panel-block").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PanelBlock />);
    expect(wrapper.hasClass("panel-block")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PanelBlock className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}be active`, () => {
      const wrapper = Enzyme.shallow(<PanelBlock active={active} />);
      expect(wrapper.hasClass("is-active")).toBe(active);
    }),
  );
});
