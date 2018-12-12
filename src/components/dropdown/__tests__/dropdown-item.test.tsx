import Enzyme from "enzyme";
import React from "react";

import { DropdownItem } from "../dropdown-item";

import { hasProperties, shallowInContext } from "@/__tests__/helpers";
import { contextFactory } from "./helpers";

describe("DropdownItem component", () => {
  hasProperties(DropdownItem, {
    defaultProps: { as: "a" },
  });

  it("should render as the default component", () => {
    const wrapper = shallowInContext(DropdownItem, contextFactory(), {});
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(DropdownItem, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <DropdownItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".dropdown-item").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(DropdownItem, contextFactory(), {});
    expect(wrapper.hasClass("dropdown-item")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(DropdownItem, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should be active", () => {
    const wrapper = shallowInContext(DropdownItem, contextFactory(), {
      active: true,
    });
    expect(wrapper.hasClass("is-active")).toBe(true);
  });

  [false, true].map(hasOnClick =>
    it(`should update context ${
      hasOnClick ? "and call provided onClick" : ""
    }`, () => {
      const onClick = jest.fn();
      const setActive = jest.fn();
      const wrapper = shallowInContext(
        DropdownItem,
        contextFactory({ setActive }),
        { onClick: hasOnClick ? onClick : undefined },
      );
      wrapper.simulate("click");
      expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
      expect(setActive.mock.calls).toHaveLength(1);
      expect(setActive.mock.calls[0]).toEqual([false]);
    }),
  );
});
