import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/base/helpers";
import { Button, BUTTON_SIZES, BUTTON_STATES } from "../button";
import { ButtonGroup } from "../button-group";

import { hasProperties } from "@/__tests__/helpers";

describe("Button component", () => {
  hasProperties(Button, {
    Group: ButtonGroup,
    defaultProps: { as: "button" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Button />);
    expect(wrapper.is("button")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Button as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Button ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".button").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Button />);
    expect(wrapper.hasClass("button")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Button className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Button color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(disabled =>
    it(`should ${disabled ? "" : "not "}be disabled`, () => {
      const wrapper = Enzyme.shallow(<Button disabled={disabled} />);
      expect(wrapper.prop("disabled")).toBe(disabled);
    }),
  );

  [false, true].map(fullwidth =>
    it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
      const wrapper = Enzyme.shallow(<Button fullwidth={fullwidth} />);
      expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
    }),
  );

  [false, true].map(inverted =>
    it(`should ${inverted ? "" : "not "}be inverted`, () => {
      const wrapper = Enzyme.shallow(<Button inverted={inverted} />);
      expect(wrapper.hasClass("is-inverted")).toBe(inverted);
    }),
  );

  [false, true].map(outlined =>
    it(`should ${outlined ? "" : "not "}be outlined`, () => {
      const wrapper = Enzyme.shallow(<Button outlined={outlined} />);
      expect(wrapper.hasClass("is-outlined")).toBe(outlined);
    }),
  );

  it("should call onClick", () => {
    const onClick = jest.fn();
    const wrapper = Enzyme.shallow(<Button onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick.mock.calls).toHaveLength(1);
  });

  [false, true].map(rounded =>
    it(`should ${rounded ? "" : "not "}be rounded`, () => {
      const wrapper = Enzyme.shallow(<Button rounded={rounded} />);
      expect(wrapper.hasClass("is-rounded")).toBe(rounded);
    }),
  );

  [false, true].map(selected =>
    it(`should ${selected ? "" : "not "}be selected`, () => {
      const wrapper = Enzyme.shallow(<Button selected={selected} />);
      expect(wrapper.hasClass("is-selected")).toBe(selected);
    }),
  );

  BUTTON_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Button size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  BUTTON_STATES.map(state =>
    it(`should be ${state}`, () => {
      const wrapper = Enzyme.shallow(<Button state={state} />);
      expect(wrapper.hasClass(`is-${state}`)).toBe(true);
    }),
  );

  [false, true].map(isStatic =>
    it(`should ${isStatic ? "" : "not "}be static`, () => {
      const wrapper = Enzyme.shallow(<Button static={isStatic} />);
      expect(wrapper.hasClass("is-static")).toBe(isStatic);
    }),
  );

  [false, true].map(text =>
    it(`should ${text ? "" : "not "}be text`, () => {
      const wrapper = Enzyme.shallow(<Button text={text} />);
      expect(wrapper.hasClass("is-text")).toBe(text);
    }),
  );
});
