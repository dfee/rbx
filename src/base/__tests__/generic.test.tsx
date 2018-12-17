import Enzyme from "enzyme";
import React from "react";

import { Generic } from "../generic";

import { hasProperties } from "@/__tests__/helpers";
import { describeExoticPropTypes } from "../../__tests__/helpers";

describe("Generic component", () => {
  hasProperties(Generic, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Generic />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Generic as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Generic ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(
        wrapper
          .children() // container
          .children() // forwardAs
          .instance(),
      );
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Generic className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describeExoticPropTypes(Generic.propTypes);
});
