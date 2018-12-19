import Enzyme from "enzyme";
import React from "react";

import { PanelTab } from "../panel-tab";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "@/__tests__/testing";

describe("PanelTab component", () => {
  hasProperties(PanelTab, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PanelTab />);
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PanelTab as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PanelTab ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(
        wrapper
          .children()
          .children()
          .instance(),
      );
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PanelTab className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}be active`, () => {
      const wrapper = Enzyme.shallow(<PanelTab active={active} />);
      expect(wrapper.hasClass("is-active")).toBe(active);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = PanelTab;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "active");
  });
});
