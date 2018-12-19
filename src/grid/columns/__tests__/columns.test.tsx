import Enzyme from "enzyme";
import React from "react";

import { BREAKPOINTS } from "@/base/helpers";
import { Column } from "../column";
import { Columns, COLUMNS_GAPS } from "../columns";

import { hasProperties } from "@/__tests__/testing";

describe("Columns component", () => {
  hasProperties(Columns, {
    Column,
    defaultProps: {
      as: "div",
      multiline: true,
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Columns />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Columns as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Columns ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".columns").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Columns />);
    expect(wrapper.hasClass("columns")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Columns className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
    expect(wrapper.hasClass("is-variable")).toBe(false);
  });

  BREAKPOINTS.map(breakpoint =>
    it(`should have breakpoint ${breakpoint}`, () => {
      const wrapper = Enzyme.shallow(<Columns breakpoint={breakpoint} />);
      expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
      expect(wrapper.hasClass("is-variable")).toBe(false);
    }),
  );

  [false, true].map(centered =>
    it(`should ${centered ? "" : "not "}be centered`, () => {
      const wrapper = Enzyme.shallow(<Columns centered={centered} />);
      expect(wrapper.hasClass("is-centered")).toBe(centered);
      expect(wrapper.hasClass("is-variable")).toBe(false);
    }),
  );

  [false, true].map(gapless =>
    it(`should ${gapless ? "" : "not "}be gapless`, () => {
      const wrapper = Enzyme.shallow(<Columns gapless={gapless} />);
      expect(wrapper.hasClass("is-gapless")).toBe(gapless);
      expect(wrapper.hasClass("is-variable")).toBe(false);
    }),
  );

  COLUMNS_GAPS.map(gap =>
    it(`should have gap ${gap}`, () => {
      const wrapper = Enzyme.shallow(<Columns gap={gap} />);
      expect(wrapper.hasClass(`is-${gap}`)).toBe(true);
      expect(wrapper.hasClass("is-variable")).toBe(true);
    }),
  );

  [false, true].map(multiline =>
    it(`should ${multiline ? "" : "not "}be multiline`, () => {
      const wrapper = Enzyme.shallow(<Columns multiline={multiline} />);
      expect(wrapper.hasClass("is-multiline")).toBe(multiline);
      expect(wrapper.hasClass("is-variable")).toBe(false);
    }),
  );

  ["mobile", "tablet", "desktop", "widescreen", "fullhd"].map(breakpoint =>
    describe(`for ${breakpoint}`, () => {
      COLUMNS_GAPS.map(gap =>
        it(`should have gap ${gap}`, () => {
          const props = { [breakpoint]: { gap } };
          const wrapper = Enzyme.shallow(<Columns {...props} />);
          expect(wrapper.hasClass(`is-${gap}-${breakpoint}`)).toBe(true);
          expect(wrapper.hasClass("is-variable")).toBe(true);
        }),
      );
    }),
  );
});
