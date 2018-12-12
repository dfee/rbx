import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import { Textarea, TEXTAREA_SIZES, TEXTAREA_STATES } from "../textarea";

import { hasProperties } from "@/__tests__/helpers";

describe("Textarea component", () => {
  hasProperties(Textarea, {
    defaultProps: {
      as: "textarea",
      rows: 4,
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Textarea />);
    expect(wrapper.is("textarea")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Textarea as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Textarea ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".textarea").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Textarea />);
    expect(wrapper.hasClass("textarea")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Textarea className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Textarea color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(fixedSize =>
    it(`should ${fixedSize ? "" : "not "}have fixed size`, () => {
      const wrapper = Enzyme.shallow(<Textarea fixedSize={fixedSize} />);
      expect(wrapper.hasClass("has-fixed-size")).toBe(fixedSize);
    }),
  );

  TEXTAREA_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Textarea size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  TEXTAREA_STATES.map(state =>
    it(`should be ${state}`, () => {
      const wrapper = Enzyme.shallow(<Textarea state={state} />);
      expect(wrapper.hasClass(`is-${state}`)).toBe(true);
    }),
  );
});
