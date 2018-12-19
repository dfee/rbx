import Enzyme from "enzyme";
import React from "react";

import { PaginationList } from "../pagination-list";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("PaginationList component", () => {
  hasProperties(PaginationList, {
    defaultProps: { as: "ul" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PaginationList />);
    expect(wrapper.is("ul")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PaginationList as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PaginationList ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".pagination-list").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PaginationList />);
    expect(wrapper.hasClass("pagination-list")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PaginationList className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = PaginationList;
    testGenericPropTypes(propTypes);
  });
});
