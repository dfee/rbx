import Enzyme from "enzyme";
import React from "react";

import { CardImage } from "../card-image";

import { hasProperties } from "@/__tests__/testing";

describe("CardImage component", () => {
  hasProperties(CardImage, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<CardImage />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<CardImage as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <CardImage ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card-image").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<CardImage />);
    expect(wrapper.hasClass("card-image")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<CardImage className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
