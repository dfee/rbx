import Enzyme from "enzyme";
import React from "react";

import { ModalClose } from "../modal-close";
import { contextFactory } from "./context";

import {
  hasProperties,
  shallowInContext,
  testGenericPropTypes,
  validatePropType,
} from "../../../__tests__/testing";

describe("ModalClose component", () => {
  hasProperties(ModalClose, {
    defaultProps: { as: "button" },
  });

  it("should render as the default element", () => {
    const wrapper = shallowInContext(ModalClose, contextFactory(), {});
    expect(wrapper.is("button")).toBe(true);
    expect(wrapper.props()["aria-label"]).toEqual("close");
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(ModalClose, contextFactory(), {
      as,
    });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalClose ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal-close").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(ModalClose, contextFactory(), {});
    expect(wrapper.hasClass("modal-close")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(ModalClose, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(hasOnClick =>
    it(`should call the context"s onClose ${
      hasOnClick ? "and the onClick" : ""
    }`, () => {
      const onClick = jest.fn();
      const onClose = jest.fn();
      const wrapper = shallowInContext(
        ModalClose,
        contextFactory({ onClose }),
        { onClick: hasOnClick ? onClick : undefined },
      );
      wrapper.simulate("click");
      expect(onClose.mock.calls).toHaveLength(1);
      expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = ModalClose;
    testGenericPropTypes(propTypes);
    validatePropType(propTypes, "onClick", [
      { value: () => null, valid: true, descriptor: "func" },
      { value: "string", valid: false },
    ]);
  });
});
