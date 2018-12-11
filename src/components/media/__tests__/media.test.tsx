import Enzyme from "enzyme";
import React from "react";

import { Media } from "../media";
import { MediaItem } from "../media-item";

import { hasProperties } from "@/__tests__/helpers";

describe("Media component", () => {
  hasProperties(Media, {
    Item: MediaItem,
    defaultProps: { as: "article" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Media />);
    expect(wrapper.is("article")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Media as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Media ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".media").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Media />);
    expect(wrapper.hasClass("media")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Media className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
