import Enzyme from "enzyme";
import React from "react";

import { FileInput } from "../file-input";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("FileInput component", () => {
  hasProperties(FileInput, {
    defaultProps: { as: "input" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FileInput />);
    expect(wrapper.is("input")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<FileInput as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FileInput ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find('[type="file"]').instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FileInput />);
    expect(wrapper.hasClass("file-input")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FileInput className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = FileInput;
    testGenericPropTypes(propTypes);
  });
});
