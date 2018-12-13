import Enzyme from "enzyme";
import React from "react";
import { ModalPortal } from "../modal-portal";

import { hasProperties } from "@/__tests__/helpers";
import { noop } from "@/utils";

describe("ModalPortal component", () => {
  hasProperties(ModalPortal, {
    defaultProps: {
      closeOnBlur: false,
      closeOnEsc: true,
      onClose: noop,
    },
  });

  it("should render", () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = Enzyme.shallow(<ModalPortal as="div" innerRef={ref} />);
    expect(wrapper.children().is("div")).toBe(true);
  });

  it("should have bulma className", () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = Enzyme.shallow(<ModalPortal as="div" innerRef={ref} />);
    expect(wrapper.children().hasClass("modal")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = Enzyme.shallow(
      <ModalPortal as="div" innerRef={ref} className={className} />,
    );
    expect(wrapper.children().hasClass(className)).toBe(true);
  });

  it("should have ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = Enzyme.mount(<ModalPortal as="div" innerRef={ref} />);
    try {
      expect(ref.current).toBe(wrapper.find(".modal").instance());
    } finally {
      wrapper.unmount();
    }
  });

  [false, true].map(closeOnEsc =>
    it(`should ${
      closeOnEsc ? "" : "not "
    }call the context's onClose on ESC keydown when closeOnEsc is ${closeOnEsc}`, () => {
      const onClose = jest.fn();
      const ref = React.createRef<HTMLDivElement>();
      const wrapper = Enzyme.mount(
        <ModalPortal
          as="div"
          innerRef={ref}
          onClose={onClose}
          closeOnEsc={closeOnEsc}
        />,
      );
      try {
        const escEvent = new KeyboardEvent("keydown", { code: "Escape" });
        document.dispatchEvent(escEvent);
        expect(onClose.mock.calls).toHaveLength(closeOnEsc ? 1 : 0);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  it("should render without document (ssr)", () => {
    const initDocument = (global as any).document;
    try {
      delete (global as any).document;
      const ref = React.createRef<HTMLDivElement>();
      const wrapper = Enzyme.shallow(<ModalPortal as="div" innerRef={ref} />);
      wrapper.unmount();
    } finally {
      (global as any).document = initDocument;
    }
  });
});
