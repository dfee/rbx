import Enzyme from "enzyme";
import React from "react";

import { FileLabel } from "../file-label";

import { hasProperties } from "@/__tests__/helpers";

describe("FileLabel component", () => {
  hasProperties(FileLabel, {
    defaultProps: { as: "label" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FileLabel />);
    expect(wrapper.is("label")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<FileLabel as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLLabelElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FileLabel ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".file-label").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FileLabel />);
    expect(wrapper.hasClass("file-label")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FileLabel className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
