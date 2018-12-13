import Enzyme from "enzyme";
import React from "react";

import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Label, LABEL_SIZES } from "../label";
import { Radio } from "../radio";

import { hasProperties } from "@/__tests__/helpers";

describe("Label component", () => {
  hasProperties(Label, {
    defaultProps: { as: "label" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Label />);
    expect(wrapper.is("label")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Label as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLLabelElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Label ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("label").instance());
    } finally {
      wrapper.unmount();
    }
  });

  ["component", "string"].map(type =>
    it("should have bulma className for ", () => {
      const wrapper = Enzyme.shallow(
        <Label children={type === "component" ? <Input /> : type} />,
      );
      expect(wrapper.hasClass("label")).toBe(true);
    }),
  );

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Label className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  ["element", "component"].map(type =>
    it(`should infer checkbox className for ${type}`, () => {
      const wrapper = Enzyme.shallow(
        <Label>
          {type === "element" ? <input type="checkbox" /> : <Checkbox />}
        </Label>,
      );
      expect(wrapper.hasClass("checkbox")).toBe(true);
      expect(wrapper.hasClass("input")).toBe(false);
    }),
  );

  ["element", "component"].map(type =>
    it(`should infer radio className for ${type}`, () => {
      const wrapper = Enzyme.shallow(
        <Label>{type === "element" ? <input type="radio" /> : <Radio />}</Label>,
      );
      expect(wrapper.hasClass("radio")).toBe(true);
      expect(wrapper.hasClass("input")).toBe(false);
    }),
  );

  [false, true].map(disabled =>
    it(`should ${disabled ? "" : "not "}be disabled`, () => {
      const wrapper = Enzyme.shallow(<Label disabled={disabled} />);
      expect(wrapper.hasClass("is-disabled")).toBe(disabled);
    }),
  );

  LABEL_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Label size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
