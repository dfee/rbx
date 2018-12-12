import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import { Tile, TILE_KINDS, TILE_SIZES } from "../tile";

import { hasProperties } from "@/__tests__/helpers";

describe("Tile component", () => {
  hasProperties(Tile, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Tile />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Tile as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Tile ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".tile").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Tile />);
    expect(wrapper.hasClass("tile")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Tile className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Tile color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  TILE_KINDS.map(kind =>
    it(`should be ${kind}`, () => {
      const wrapper = Enzyme.shallow(<Tile kind={kind} />);
      expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
    }),
  );

  [false, true].map(notification =>
    it(`should ${notification ? "" : "not "}be notification`, () => {
      const wrapper = Enzyme.shallow(<Tile notification={notification} />);
      expect(wrapper.hasClass("notification")).toBe(notification);
    }),
  );

  TILE_SIZES.map(size =>
    it(`should be size ${size}`, () => {
      const wrapper = Enzyme.shallow(<Tile size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  [false, true].map(vertical =>
    it(`should ${vertical ? "" : "not "}be vertical`, () => {
      const wrapper = Enzyme.shallow(<Tile vertical={vertical} />);
      expect(wrapper.hasClass("is-vertical")).toBe(vertical);
    }),
  );
});
