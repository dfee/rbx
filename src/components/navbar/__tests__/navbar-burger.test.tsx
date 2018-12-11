import Enzyme from "enzyme";
import React from "react";

import { NavbarBurger } from "../navbar-burger";
import { contextFactory } from "./helpers";

import { hasProperties, shallowInContext } from "@/__tests__/helpers";

describe("NavbarBurger component", () => {
  hasProperties(NavbarBurger, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = shallowInContext(NavbarBurger, contextFactory(), {});
    expect(wrapper.is("div")).toBe(true);
    expect(wrapper.props().role).toEqual("button");
    expect(wrapper.prop("style")).toHaveProperty("outline", "none");
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(NavbarBurger, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarBurger ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-burger").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(NavbarBurger, contextFactory(), {});
    expect(wrapper.hasClass("navbar-burger")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(NavbarBurger, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should preserve custom style", () => {
    const wrapper = shallowInContext(NavbarBurger, contextFactory(), {
      style: { margin: "10px" },
    });
    expect(wrapper.prop("style")).toHaveProperty("margin", "10px");
  });

  it("should call the onClick handler and the context's setActive", () => {
    const onClick = jest.fn();
    const setActive = jest.fn();
    const wrapper = shallowInContext(
      NavbarBurger,
      contextFactory({ setActive }),
      {
        onClick: onClick as React.MouseEventHandler<any>,
      },
    );
    wrapper.simulate("click");
    expect(setActive.mock.calls).toHaveLength(1);
    expect(onClick.mock.calls).toHaveLength(1);
  });
});
