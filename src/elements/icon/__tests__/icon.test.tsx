import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import { Icon, ICON_ALIGNMENTS, ICON_SIZES } from "../icon";

import { hasProperties } from "@/__tests__/helpers";

describe("Icon component", () => {
  hasProperties(Icon, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Icon />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<Icon as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Icon ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".icon").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Icon />);
    expect(wrapper.hasClass("icon")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Icon className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Icon color={color} />);
      expect(wrapper.hasClass(`has-text-${color}`)).toBe(true);
    }),
  );

  ICON_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.shallow(<Icon align={align} />);
      expect(wrapper.hasClass(`is-${align}`)).toBe(true);
    }),
  );

  ICON_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Icon size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
