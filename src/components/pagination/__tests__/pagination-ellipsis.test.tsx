import Enzyme from "enzyme";
import React from "react";

import { PaginationEllipsis } from "../pagination-ellipsis";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("PaginationEllipsis component", () => {
  hasProperties(PaginationEllipsis, {
    defaultProps: {
      as: "span",
      children: "…",
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PaginationEllipsis />);
    expect(wrapper.children().is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<PaginationEllipsis as={as} />);
    expect(wrapper.children().is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PaginationEllipsis ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".pagination-ellipsis").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PaginationEllipsis />);
    expect(wrapper.children().hasClass("pagination-ellipsis")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(
      <PaginationEllipsis className={className} />,
    );
    expect(wrapper.children().hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = PaginationEllipsis;
    testGenericPropTypes(propTypes);
  });
});
