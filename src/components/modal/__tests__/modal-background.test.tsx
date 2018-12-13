import Enzyme from "enzyme";
import React from "react";
import { ModalBackground } from "../modal-background";

import { hasProperties, shallowInContext } from "@/__tests__/helpers";
import { contextFactory } from "./helpers";

describe("ModalBackground component", () => {
  hasProperties(ModalBackground, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = shallowInContext(ModalBackground, contextFactory(), {});
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(ModalBackground, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalBackground ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal-background").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(ModalBackground, contextFactory(), {});
    expect(wrapper.hasClass("modal-background")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(ModalBackground, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(closeOnBlur =>
    [false, true].map(hasOnClick =>
      it(`should ${closeOnBlur ? "" : "not "}close on click when ${
        closeOnBlur ? "" : "not "
      }closeOnBlur ${hasOnClick ? "and call onClick" : ""}`, () => {
        const onClick = jest.fn();
        const onClose = jest.fn();
        const wrapper = shallowInContext(
          ModalBackground,
          contextFactory({ closeOnBlur, onClose }),
          { onClick: hasOnClick ? onClick : undefined },
        );
        wrapper.simulate("click");
        expect(onClose.mock.calls).toHaveLength(closeOnBlur ? 1 : 0);
        expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
      }),
    ),
  );
});
