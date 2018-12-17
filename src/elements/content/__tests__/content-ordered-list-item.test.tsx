import Enzyme from "enzyme";
import React from "react";

import { ContentOrderedListItem } from "../content-ordered-list-item";

import { describeExoticPropTypes, hasProperties } from "@/__tests__/helpers";

describe("ContentOrderedListItem component", () => {
  hasProperties(ContentOrderedListItem, {
    defaultProps: { as: "li" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ContentOrderedListItem />);
    expect(wrapper.is("li")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ContentOrderedListItem as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLLIElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ContentOrderedListItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("li").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(
      <ContentOrderedListItem className={className} />,
    );
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describeExoticPropTypes(ContentOrderedListItem.propTypes);
});
