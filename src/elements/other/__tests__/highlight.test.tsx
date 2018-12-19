import Enzyme from "enzyme";
import React from "react";

import { Highlight } from "../highlight";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("Highlight component", () => {
  hasProperties(Highlight, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Highlight />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Highlight as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Highlight ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".highlight").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Highlight />);
    expect(wrapper.hasClass("highlight")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Highlight className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Highlight;
    testGenericPropTypes(propTypes);
  });
});
