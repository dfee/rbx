import Enzyme from "enzyme";
import React from "react";

import {
  CONTENT_ORDERED_LIST_TYPES,
  ContentOrderedList,
} from "../content-ordered-list";
import { ContentOrderedListItem } from "../content-ordered-list-item";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("ContentOrderedList component", () => {
  hasProperties(ContentOrderedList, {
    Item: ContentOrderedListItem,
    defaultProps: { as: "ol" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ContentOrderedList />);
    expect(wrapper.is("ol")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ContentOrderedList as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLOListElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ContentOrderedList ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("ol").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(
      <ContentOrderedList className={className} />,
    );
    expect(wrapper.hasClass(className)).toBe(true);
  });

  CONTENT_ORDERED_LIST_TYPES.map(type =>
    it(`should be ${type}`, () => {
      const wrapper = Enzyme.shallow(<ContentOrderedList type={type} />);
      expect(wrapper.hasClass(`is-${type}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = ContentOrderedList;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "type", CONTENT_ORDERED_LIST_TYPES);
  });
});
