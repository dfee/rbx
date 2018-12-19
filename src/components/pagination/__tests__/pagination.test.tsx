import Enzyme from "enzyme";
import React from "react";

import {
  Pagination,
  PAGINATION_ALIGNMENTS,
  PAGINATION_SIZES,
} from "../pagination";
import { PaginationEllipsis } from "../pagination-ellipsis";
import { PaginationLink } from "../pagination-link";
import { PaginationList } from "../pagination-list";
import { PaginationNext } from "../pagination-next";
import { PaginationPrevious } from "../pagination-previous";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("Pagination component", () => {
  hasProperties(Pagination, {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Next: PaginationNext,
    Previous: PaginationPrevious,
    defaultProps: { as: "nav" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Pagination />);
    expect(wrapper.is("nav")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Pagination as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Pagination ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".pagination").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Pagination />);
    expect(wrapper.hasClass("pagination")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Pagination className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  PAGINATION_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.shallow(<Pagination align={align} />);
      expect(wrapper.hasClass(`is-${align}`)).toBe(true);
    }),
  );

  PAGINATION_SIZES.map(size =>
    it(`should be size ${size}`, () => {
      const wrapper = Enzyme.shallow(<Pagination size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  [false, true].map(rounded =>
    it(`should ${rounded ? "" : "not "} be rouned`, () => {
      const wrapper = Enzyme.shallow(<Pagination rounded={rounded} />);
      expect(wrapper.hasClass("is-rounded")).toBe(rounded);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Pagination;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "align", PAGINATION_ALIGNMENTS);
    validateBoolPropType(propTypes, "rounded");
    validateOneOfPropType(propTypes, "size", PAGINATION_SIZES);
  });
});
