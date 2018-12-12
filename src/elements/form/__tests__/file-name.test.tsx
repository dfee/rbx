import Enzyme from "enzyme";
import React from "react";

import { FileName } from "../file-name";

import { hasProperties } from "@/__tests__/helpers";

describe("FileName component", () => {
  hasProperties(FileName, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FileName />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<FileName as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FileName ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".file-name").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FileName />);
    expect(wrapper.hasClass("file-name")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FileName className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
