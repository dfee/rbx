import Enzyme from "enzyme";
import React from "react";

import { MEDIA_ITEM_POSITIONS, MediaItem } from "../media-item";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("MediaItem component", () => {
  hasProperties(MediaItem, {
    defaultProps: { as: "div", position: "content" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<MediaItem />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<MediaItem as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <MediaItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".media-content").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<MediaItem />);
    expect(wrapper.hasClass("media-content")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<MediaItem className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  MEDIA_ITEM_POSITIONS.map(position =>
    it(`should have position ${position}`, () => {
      const wrapper = Enzyme.shallow(<MediaItem position={position} />);
      expect(wrapper.hasClass(`media-${position}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = MediaItem;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "position", MEDIA_ITEM_POSITIONS);
  });
});
