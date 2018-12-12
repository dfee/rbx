import Enzyme from "enzyme";
import React from "react";

import { Control, CONTROL_SIZES } from "../control";

import { hasProperties } from "@/__tests__/helpers";

describe("Control component", () => {
  hasProperties(Control, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Control />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Control as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Control ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".control").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Control />);
    expect(wrapper.hasClass("control")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Control className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(expanded =>
    it(`should ${expanded ? "" : "not "}be expanded`, () => {
      const wrapper = Enzyme.shallow(<Control expanded={expanded} />);
      expect(wrapper.hasClass("is-expanded")).toBe(expanded);
    }),
  );

  [false, true].map(iconLeft =>
    it(`should ${iconLeft ? "" : "not "}be icon-left`, () => {
      const wrapper = Enzyme.shallow(<Control iconLeft={iconLeft} />);
      expect(wrapper.hasClass("has-icons-left")).toBe(iconLeft);
    }),
  );

  [false, true].map(iconRight =>
    it(`should ${iconRight ? "" : "not "}be icon-right`, () => {
      const wrapper = Enzyme.shallow(<Control iconRight={iconRight} />);
      expect(wrapper.hasClass("has-icons-right")).toBe(iconRight);
    }),
  );

  [false, true].map(loading =>
    it(`should ${loading ? "" : "not "}be loading`, () => {
      const wrapper = Enzyme.shallow(<Control loading={loading} />);
      expect(wrapper.hasClass("is-loading")).toBe(loading);
    }),
  );

  CONTROL_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Control size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
