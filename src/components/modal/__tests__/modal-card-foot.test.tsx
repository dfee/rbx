import Enzyme from "enzyme";
import React from "react";

import { ModalCardFoot } from "../modal-card-foot";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("ModalCardFoot component", () => {
  hasProperties(ModalCardFoot, {
    defaultProps: { as: "footer" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ModalCardFoot />);
    expect(wrapper.is("footer")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ModalCardFoot as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalCardFoot ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal-card-foot").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ModalCardFoot />);
    expect(wrapper.hasClass("modal-card-foot")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ModalCardFoot className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = ModalCardFoot;
    testGenericPropTypes(propTypes);
  });
});
