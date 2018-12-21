import Enzyme from "enzyme";
import React from "react";

import { PaginationLink } from "../pagination-link";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "../../../__tests__/testing";

describe("PaginationLink component", () => {
  hasProperties(PaginationLink, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<PaginationLink />);
    expect(wrapper.children().is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<PaginationLink as={as} />);
    expect(wrapper.children().is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <PaginationLink ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".pagination-link").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<PaginationLink />);
    expect(wrapper.children().hasClass("pagination-link")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<PaginationLink className={className} />);
    expect(wrapper.children().hasClass(className)).toBe(true);
  });

  [false, true].map(current =>
    it(`should ${current ? "" : "not "} be current`, () => {
      const wrapper = Enzyme.shallow(<PaginationLink current={current} />);
      expect(wrapper.children().hasClass("is-current")).toBe(current);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = PaginationLink;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "current");
  });
});
