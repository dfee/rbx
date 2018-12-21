import Enzyme from "enzyme";
import React from "react";

import { PaginationNext } from "../pagination-next";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("PaginationNext component", () => {
  hasProperties(PaginationNext, {
    defaultProps: {
      as: "a",
      children: "Next page",
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PaginationNext />);
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PaginationNext as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PaginationNext ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".pagination-next").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PaginationNext />);
    expect(wrapper.hasClass("pagination-next")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PaginationNext className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = PaginationNext;
    testGenericPropTypes(propTypes);
  });
});
