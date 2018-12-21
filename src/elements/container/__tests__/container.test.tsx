import Enzyme from "enzyme";
import React from "react";

import { BREAKPOINTS } from "../../../base/helpers";
import { Container } from "../container";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("Container component", () => {
  hasProperties(Container, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Container />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Container as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Container ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".container").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Container />);
    expect(wrapper.hasClass("container")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Container className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should be fluid", () => {
    const wrapper = Enzyme.shallow(<Container fluid />);
    expect(wrapper.hasClass("is-fluid")).toBe(true);
  });

  BREAKPOINTS.map(breakpoint =>
    it(`should have breakpoint ${breakpoint}`, () => {
      const wrapper = Enzyme.shallow(<Container breakpoint={breakpoint} />);
      expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Container;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "breakpoint", BREAKPOINTS);
    validateBoolPropType(propTypes, "fluid");
  });
});
