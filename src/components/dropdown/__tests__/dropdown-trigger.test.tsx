import Enzyme from "enzyme";
import React from "react";

import { DropdownTrigger } from "../dropdown-trigger";

import {
  hasProperties,
  shallowInContext,
  testGenericPropTypes,
  validatePropType,
} from "../../../__tests__/testing";
import { contextFactory } from "./context";

describe("DropdownTrigger component", () => {
  hasProperties(DropdownTrigger, {
    defaultProps: { as: "div" },
  });

  it("should render as the default component", () => {
    const wrapper = shallowInContext(DropdownTrigger, contextFactory(), {});
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(DropdownTrigger, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <DropdownTrigger ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".dropdown-trigger").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(DropdownTrigger, contextFactory(), {});
    expect(wrapper.hasClass("dropdown-trigger")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(DropdownTrigger, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(hasOnClick =>
    it(`should update context ${
      hasOnClick ? "and call provided onClick" : ""
    }`, () => {
      const onClick = jest.fn();
      const setActive = jest.fn();
      const wrapper = shallowInContext(
        DropdownTrigger,
        contextFactory({ active: false, setActive }),
        { onClick: hasOnClick ? onClick : undefined },
      );
      wrapper.simulate("click");
      expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
      expect(setActive.mock.calls).toHaveLength(1);
      expect(setActive.mock.calls[0]).toEqual([true]);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = DropdownTrigger;
    testGenericPropTypes(propTypes);
    validatePropType(propTypes, "onClick", [
      { value: () => null, valid: true, descriptor: "func" },
      { value: "string", valid: false },
    ]);
  });
});
