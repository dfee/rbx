import Enzyme from "enzyme";
import React from "react";

import { Dropdown, DROPDOWN_ALIGNMENTS, DropdownController } from "../dropdown";
import { DropdownContent } from "../dropdown-content";
import { DropdownContext } from "../dropdown-context";
import { DropdownDivider } from "../dropdown-divider";
import { DropdownItem } from "../dropdown-item";
import { DropdownMenu } from "../dropdown-menu";
import { DropdownTrigger } from "../dropdown-trigger";

import { hasProperties } from "@/__tests__/helpers";

describe("Card component", () => {
  hasProperties(Dropdown, {
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
    defaultProps: { as: "div" },
  });

  it("should render as the default component", () => {
    const wrapper = Enzyme.mount(<Dropdown />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .is("div"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.mount(<Dropdown as={as} />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .is(as),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Dropdown ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".dropdown").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.mount(<Dropdown />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .hasClass("dropdown"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.mount(<Dropdown className={className} />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .hasClass(className),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should be active", () => {
    const wrapper = Enzyme.mount(<Dropdown active />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .hasClass("is-active"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should be hoverable", () => {
    const wrapper = Enzyme.mount(<Dropdown hoverable />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .hasClass("is-hoverable"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should be up", () => {
    const wrapper = Enzyme.mount(<Dropdown up />);
    try {
      expect(
        wrapper
          .find(DropdownController)
          .children()
          .hasClass("is-up"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  DROPDOWN_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.mount(<Dropdown align={align} />);
      try {
        expect(
          wrapper
            .find(DropdownController)
            .children()
            .hasClass(`is-${align}`),
        ).toBe(true);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(managed =>
    it(`should ${
      managed ? "not " : ""
    }be disabled on click in document when managed is ${managed}`, () => {
      const wrapper = Enzyme.mount(<Dropdown active managed={managed} />);
      try {
        document.getElementsByTagName("body")[0].click();
        wrapper.update();
        expect(wrapper.find(".dropdown").hasClass("is-active")).toBe(managed);
      } finally {
        wrapper.unmount();
      }
    }),
  );
});
