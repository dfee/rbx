import Enzyme from "enzyme";
import React from "react";

import { CardHeader } from "../card-header";
import { CardHeaderIcon } from "../card-header-icon";
import { CardHeaderTitle } from "../card-header-title";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("CardHeader component", () => {
  hasProperties(CardHeader, {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<CardHeader />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<CardHeader as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <CardHeader ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card-header").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<CardHeader />);
    expect(wrapper.hasClass("card-header")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<CardHeader className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = CardHeader;
    testGenericPropTypes(propTypes);
  });
});
