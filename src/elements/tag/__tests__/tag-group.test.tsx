import Enzyme from "enzyme";
import React from "react";

import { TagGroup } from "../tag-group";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "@/__tests__/testing";

describe("TagGroup component", () => {
  hasProperties(TagGroup, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<TagGroup />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<TagGroup as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <TagGroup ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".tags").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<TagGroup />);
    expect(wrapper.hasClass("tags")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<TagGroup className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(gapless =>
    it(`should ${gapless ? "" : "not "}be gapless`, () => {
      const wrapper = Enzyme.shallow(<TagGroup gapless={gapless} />);
      expect(wrapper.hasClass("has-addons")).toBe(gapless);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = TagGroup;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "gapless");
  });
});
