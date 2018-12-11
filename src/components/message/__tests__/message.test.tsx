import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import { Message, MESSAGE_SIZES } from "../message";
import { MessageBody } from "../message-body";
import { MessageHeader } from "../message-header";

import { hasProperties } from "@/__tests__/helpers";

describe("Message component", () => {
  hasProperties(Message, {
    Body: MessageBody,
    Header: MessageHeader,
    defaultProps: { as: "article" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Message />);
    expect(wrapper.is("article")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Message as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Message ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".message").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Message />);
    expect(wrapper.hasClass("message")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Message className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  /**
   * Props
   */
  COLORS.map(color =>
    it(`should be color ${color}`, () => {
      const wrapper = Enzyme.shallow(<Message color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  MESSAGE_SIZES.map(size =>
    it(`should be size ${size}`, () => {
      const wrapper = Enzyme.shallow(<Message size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
