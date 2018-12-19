import Enzyme from "enzyme";
import React from "react";

import { Column, COLUMN_SIZES } from "../column";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
  validatePropType,
} from "@/__tests__/testing";
import { BREAKPOINTS } from "@/base/helpers";

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

  BREAKPOINTS.map(breakpoint =>
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

  describe("propTypes", () => {
    const { propTypes } = Column;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "narrow");
    validateOneOfPropType(propTypes, "offset", COLUMN_SIZES);
    validateOneOfPropType(propTypes, "size", COLUMN_SIZES);

    BREAKPOINTS.map(breakpoint => {
      describe(breakpoint, () => {
        validatePropType(propTypes, breakpoint, [
          ...[false, true].map(value => ({
            descriptor: `narrow = ${value}`,
            valid: true,
            value: { narrow: value },
          })),
          {
            descriptor: "narrow = 'string'",
            error: new RegExp(
              `Warning.+Failed prop.+ \`${breakpoint}.narrow\``,
            ),
            valid: false,
            value: { narrow: "string" },
          },
        ]);

        validatePropType(propTypes, breakpoint, [
          ...COLUMN_SIZES.map(value => ({
            descriptor: `offset = ${value}`,
            valid: true,
            value: { offset: value },
          })),
          {
            descriptor: "offset = __UNKNOWN",
            error: new RegExp(
              `Warning.+Failed prop.+ \`${breakpoint}.offset\``,
            ),
            valid: false,
            value: { offset: "__UNKNOWN" },
          },
        ]);

        validatePropType(propTypes, breakpoint, [
          ...COLUMN_SIZES.map(value => ({
            descriptor: `size = ${value}`,
            valid: true,
            value: { size: value },
          })),
          {
            descriptor: "size = __UNKNOWN",
            error: new RegExp(`Warning.+Failed prop.+ \`${breakpoint}.size\``),
            valid: false,
            value: { size: "__UNKNOWN" },
          },
        ]);
      });
    });
  });
});
