import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import { Hero, HERO_SIZES } from "../hero";
import { HeroBody } from "../hero-body";
import { HeroFoot } from "../hero-foot";
import { HeroHead } from "../hero-head";

import { hasProperties } from "@/__tests__/helpers";

describe("Hero component", () => {
  hasProperties(Hero, {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
    defaultProps: { as: "section" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Hero />);
    expect(wrapper.is("section")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Hero as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Hero ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".hero").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Hero />);
    expect(wrapper.hasClass("hero")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Hero className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Hero color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(gradient =>
    it(`should ${gradient ? "" : "not "}have gradient`, () => {
      const wrapper = Enzyme.shallow(<Hero gradient={gradient} />);
      expect(wrapper.hasClass("is-bold")).toBe(gradient);
    }),
  );

  HERO_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Hero size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
