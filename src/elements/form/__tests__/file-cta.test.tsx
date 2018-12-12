import Enzyme from "enzyme";
import React from "react";

import { FileCTA } from "../file-cta";

import { hasProperties } from "@/__tests__/helpers";

describe("FileCTA component", () => {
  hasProperties(FileCTA, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FileCTA />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<FileCTA as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FileCTA ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".file-cta").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FileCTA />);
    expect(wrapper.hasClass("file-cta")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FileCTA className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
