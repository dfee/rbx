import Enzyme from "enzyme";
import React from "react";

import { NavbarLink } from "../navbar-link";

import {
  hasProperties,
  shallowInContext,
  testGenericPropTypes,
  validateBoolPropType,
  validatePropType,
} from "../../../__tests__/testing";
import { navbarItemContextFactory } from "./context";

describe("NavbarLink component", () => {
  hasProperties(NavbarLink, {
    defaultProps: { as: "span" },
  });

  it("should render as the default component", () => {
    const wrapper = shallowInContext(
      NavbarLink,
      navbarItemContextFactory(),
      {},
    );
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(NavbarLink, navbarItemContextFactory(), {
      as,
    });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarLink ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-link").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(
      NavbarLink,
      navbarItemContextFactory(),
      {},
    );
    expect(wrapper.hasClass("navbar-link")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(NavbarLink, navbarItemContextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(arrowless =>
    it(`should ${arrowless ? "" : "not "}be arrowless`, () => {
      const wrapper = shallowInContext(NavbarLink, navbarItemContextFactory(), {
        arrowless,
      });
      expect(wrapper.hasClass("is-arrowless")).toBe(arrowless);
    }),
  );

  [false, true].map(hasOnClick =>
    it(`should update context ${
      hasOnClick ? "and call provided onClick" : ""
    }`, () => {
      const onClick = jest.fn();
      const setActive = jest.fn();
      const wrapper = shallowInContext(
        NavbarLink,
        navbarItemContextFactory({ active: false, setActive }),
        { onClick: hasOnClick ? onClick : undefined },
      );
      wrapper.simulate("click");
      expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
      expect(setActive.mock.calls).toHaveLength(1);
      expect(setActive.mock.calls[0]).toEqual([true]);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = NavbarLink;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "arrowless");
    validatePropType(propTypes, "onClick", [
      { value: () => null, valid: true, descriptor: "func" },
      { value: "string", valid: false },
    ]);
  });
});
