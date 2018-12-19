import Enzyme from "enzyme";
import React from "react";

import { MessageHeader } from "../message-header";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("MessageHeader component", () => {
  hasProperties(MessageHeader, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<MessageHeader />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<MessageHeader as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <MessageHeader ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".message-header").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<MessageHeader />);
    expect(wrapper.hasClass("message-header")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<MessageHeader className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = MessageHeader;
    testGenericPropTypes(propTypes);
  });
});
