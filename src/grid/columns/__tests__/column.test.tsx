import Enzyme from "enzyme";
import React from "react";

import { Column, COLUMN_SIZES } from "../column";

import { hasProperties } from "@/__tests__/helpers";

describe("Column component", () => {
  hasProperties(Column, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Column />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Column as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Column ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".column").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Column />);
    expect(wrapper.hasClass("column")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Column className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(narrow =>
    it(`should ${narrow ? "" : "not "}be narrow`, () => {
      const wrapper = Enzyme.shallow(<Column narrow={narrow} />);
      expect(wrapper.hasClass("is-narrow")).toBe(narrow);
    }),
  );

  COLUMN_SIZES.map(offset =>
    it(`should be offset ${offset}`, () => {
      const wrapper = Enzyme.shallow(<Column offset={offset} />);
      expect(wrapper.hasClass(`is-offset-${offset}`)).toBe(true);
    }),
  );

  COLUMN_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Column size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  ["mobile", "tablet", "desktop", "widescreen", "fullhd", "touch"].map(
    breakpoint =>
      describe(`for ${breakpoint}:`, () => {
        [false, true].map(narrow =>
          it(`should ${narrow ? "" : "not "}be narrow`, () => {
            const props = { [breakpoint]: { narrow } };
            const wrapper = Enzyme.shallow(<Column {...props} />);
            expect(wrapper.hasClass(`is-narrow-${breakpoint}`)).toBe(narrow);
          }),
        );

        COLUMN_SIZES.map(offset =>
          it(`should be offset ${offset}`, () => {
            const props = { [breakpoint]: { offset } };
            const wrapper = Enzyme.shallow(<Column {...props} />);
            expect(wrapper.hasClass(`is-offset-${offset}-${breakpoint}`)).toBe(
              true,
            );
          }),
        );

        COLUMN_SIZES.map(size =>
          it(`should be ${size}`, () => {
            const props = { [breakpoint]: { size } };
            const wrapper = Enzyme.shallow(<Column {...props} />);
            expect(wrapper.hasClass(`is-${size}-${breakpoint}`)).toBe(true);
          }),
        );
      }),
  );
});
