import Enzyme from "enzyme";
import React from "react";

import { ModalCardTitle } from "../modal-card-title";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("ModalCardTitle component", () => {
  hasProperties(ModalCardTitle, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ModalCardTitle />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ModalCardTitle as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalCardTitle ref={ref} />
      </div>,
    );
    const forwardRefWrapper = wrapper.children();
    const componentWrapper = forwardRefWrapper.children();
    try {
      expect(ref.current).toBe(componentWrapper.instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ModalCardTitle />);
    expect(wrapper.hasClass("modal-card-title")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ModalCardTitle className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = ModalCardTitle;
    testGenericPropTypes(propTypes);
  });
});
