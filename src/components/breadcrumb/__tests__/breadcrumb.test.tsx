import Enzyme from "enzyme";
import React from "react";

import {
  Breadcrumb,
  BREADCRUMB_ALIGNMENTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
} from "../breadcrumb";
import { BreadcrumbItem } from "../breadcrumb-item";

import { hasProperties } from "@/__tests__/helpers";

describe("Breadcrumb component", () => {
  hasProperties(Breadcrumb, {
    Item: BreadcrumbItem,
    defaultProps: { as: "nav" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Breadcrumb />);
    expect(wrapper.is("nav")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<Breadcrumb as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Breadcrumb ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".breadcrumb").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Breadcrumb />);
    expect(wrapper.hasClass("breadcrumb"));
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Breadcrumb className={className} />);
    expect(wrapper.hasClass(className));
  });

  BREADCRUMB_ALIGNMENTS.map(alignment =>
    it(`should have alignment ${alignment}`, () => {
      const wrapper = Enzyme.shallow(<Breadcrumb align={alignment} />);
      expect(wrapper.find(".breadcrumb").hasClass(`is-${alignment}`)).toBe(
        true,
      );
    }),
  );

  BREADCRUMB_SEPARATORS.map(separator =>
    it(`should have separator ${separator}`, () => {
      const wrapper = Enzyme.shallow(<Breadcrumb separator={separator} />);
      expect(
        wrapper.find(".breadcrumb").hasClass(`has-${separator}-separator`),
      ).toBe(true);
    }),
  );

  BREADCRUMB_SIZES.map(size =>
    it(`should have size ${size}`, () => {
      const wrapper = Enzyme.shallow(<Breadcrumb size={size} />);
      expect(wrapper.find(".breadcrumb").hasClass(`is-${size}`)).toBe(true);
    }),
  );
});
