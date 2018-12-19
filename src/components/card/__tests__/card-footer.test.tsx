import Enzyme from "enzyme";
import React from "react";

import { CardFooter } from "../card-footer";
import { CardFooterItem } from "../card-footer-item";

import { hasProperties } from "@/__tests__/testing";

describe("CardFooter component", () => {
  hasProperties(CardFooter, {
    Item: CardFooterItem,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<CardFooter />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<CardFooter as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <CardFooter ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card-footer").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<CardFooter />);
    expect(wrapper.hasClass("card-footer")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<CardFooter className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
