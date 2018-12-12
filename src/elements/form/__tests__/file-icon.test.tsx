import Enzyme from "enzyme";
import React from "react";

import { FileIcon } from "../file-icon";

import { hasProperties } from "@/__tests__/helpers";

describe("FileIcon component", () => {
  hasProperties(FileIcon, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FileIcon />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<FileIcon as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FileIcon ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".file-icon").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FileIcon />);
    expect(wrapper.hasClass("file-icon")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FileIcon className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
