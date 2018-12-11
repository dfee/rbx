import Enzyme from "enzyme";
import React from "react";

import { Delete } from "@/elements";
import { ModalCardHead } from "../modal-card-head";

import { hasProperties, shallowInContext } from "@/__tests__/helpers";
import { contextFactory } from "./helpers";

describe("ModalCardHead component", () => {
  hasProperties(ModalCardHead, {
    defaultProps: { as: "header" },
  });

  it("should render as the default element", () => {
    const wrapper = shallowInContext(ModalCardHead, contextFactory(), {});
    expect(wrapper.is("header")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(ModalCardHead, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalCardHead ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal-card-head").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(ModalCardHead, contextFactory(), {});
    expect(wrapper.hasClass("modal-card-head")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(ModalCardHead, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should call Delete's onClick and the context's onClose", () => {
    const onClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = shallowInContext(
      ModalCardHead,
      contextFactory({ onClose }),
      { children: <Delete onClick={onClick} /> },
    );
    wrapper.find(Delete).simulate("click");
    expect(onClose.mock.calls).toHaveLength(1);
    expect(onClick.mock.calls).toHaveLength(1);
  });
});
