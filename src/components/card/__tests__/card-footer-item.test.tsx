import Enzyme from "enzyme";
import React from "react";

import { CardFooterItem } from "../card-footer-item";

import { hasProperties } from "@/__tests__/testing";

describe("CardFooterItem component", () => {
  hasProperties(CardFooterItem, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<CardFooterItem />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<CardFooterItem as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <CardFooterItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card-footer-item").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<CardFooterItem />);
    expect(wrapper.hasClass("card-footer-item")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<CardFooterItem className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
