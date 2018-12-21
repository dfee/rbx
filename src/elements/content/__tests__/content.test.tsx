import Enzyme from "enzyme";
import React from "react";

import { Content, CONTENT_SIZES } from "../content";
import { ContentOrderedList } from "../content-ordered-list";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("Content component", () => {
  hasProperties(Content, {
    OrderedList: ContentOrderedList,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Content />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Content as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Content ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".content").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Content />);
    expect(wrapper.hasClass("content")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Content className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  CONTENT_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Content size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Content;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "size", CONTENT_SIZES);
  });
});
