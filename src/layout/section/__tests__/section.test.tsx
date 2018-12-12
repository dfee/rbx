import Enzyme from "enzyme";
import React from "react";

import { Section, SECTION_SIZES } from "../section";

import { hasProperties } from "@/__tests__/helpers";

describe("Section component", () => {
  hasProperties(Section, {
    defaultProps: { as: "section" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Section />);
    expect(wrapper.is("section")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Section as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Section ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".section").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Section />);
    expect(wrapper.hasClass("section")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Section className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  SECTION_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Section size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
