import Enzyme from "enzyme";
import React from "react";

import { ModalCard } from "../modal-card";
import { ModalCardBody } from "../modal-card-body";
import { ModalCardFoot } from "../modal-card-foot";
import { ModalCardHead } from "../modal-card-head";
import { ModalCardTitle } from "../modal-card-title";

import { hasProperties } from "@/__tests__/helpers";

describe("ModalCard component", () => {
  hasProperties(ModalCard, {
    Body: ModalCardBody,
    Foot: ModalCardFoot,
    Head: ModalCardHead,
    Title: ModalCardTitle,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ModalCard />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ModalCard as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ModalCard ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".modal-card").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ModalCard />);
    expect(wrapper.hasClass("modal-card")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ModalCard className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
