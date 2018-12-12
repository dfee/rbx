import Enzyme from "enzyme";
import React from "react";

import { Label, LABEL_SIZES, LABEL_SPECIFIERS } from "../label";

import { hasProperties } from "@/__tests__/helpers";

describe("Label component", () => {
  hasProperties(Label, {
    defaultProps: { specifier: "label" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Label />);
    expect(wrapper.is("label")).toBe(true);
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

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Label className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

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

  LABEL_SPECIFIERS.map(specifier =>
    it(`should be for ${specifier}`, () => {
      const wrapper = Enzyme.shallow(<Label specifier={specifier} />);
      expect(wrapper.hasClass(specifier)).toBe(true);
    }),
  );
});
