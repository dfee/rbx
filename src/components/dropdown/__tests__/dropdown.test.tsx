import Enzyme from "enzyme";
import React from "react";

import {
  Dropdown,
  DROPDOWN_ALIGNMENTS,
  DropdownContainer,
  DropdownContainerState,
} from "../dropdown";
import { DropdownContent } from "../dropdown-content";
import { DropdownContext, DropdownContextState } from "../dropdown-context";
import { DropdownDivider } from "../dropdown-divider";
import { DropdownItem } from "../dropdown-item";
import { DropdownMenu } from "../dropdown-menu";
import { DropdownTrigger } from "../dropdown-trigger";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
          .find(DropdownContainer)
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
          .find(DropdownContainer)
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
          .find(DropdownContainer)
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
          .find(DropdownContainer)
          .children()
          .hasClass(className),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}be active`, () => {
      const wrapper = Enzyme.mount(<Dropdown active={active} />);
      try {
        const children = wrapper.find(DropdownContainer).children();
        expect(children.hasClass("is-active")).toBe(active);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(hoverable =>
    it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
      const wrapper = Enzyme.mount(<Dropdown hoverable={hoverable} />);
      try {
        const children = wrapper.find(DropdownContainer).children();
        expect(children.hasClass("is-hoverable")).toBe(hoverable);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(up =>
    it(`should ${up ? "" : "not "}be up`, () => {
      const wrapper = Enzyme.mount(<Dropdown up={up} />);
      try {
        const children = wrapper.find(DropdownContainer).children();
        expect(children.hasClass("is-up")).toBe(up);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  DROPDOWN_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.mount(<Dropdown align={align} />);
      try {
        expect(
          wrapper
            .find(DropdownContainer)
            .children()
            .hasClass(`is-${align}`),
        ).toBe(true);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  it("should not be disabled if component is the target of click", () => {
    // For example, if we click a dropdown-divider
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    let wrapper;

    try {
      const ref = React.createRef<HTMLDivElement>();
      // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
      wrapper = Enzyme.mount(
        <div>
          <Dropdown active ref={ref} />
        </div>,
        { attachTo: root },
      );
      (ref.current as HTMLDivElement).click();
      wrapper.children().update();
      expect(wrapper.find(".dropdown").hasClass("is-active")).toBe(true);
    } finally {
      if (wrapper) {
        wrapper.unmount();
      }
      document.body.removeChild(root);
    }
  });

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

  [undefined, false, true].map(initialActive =>
    [undefined, false, true].map(managed =>
      it(`should ${
        managed ? "" : "not "
      }set DropdownContainer's state.active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
        let contextState: DropdownContextState | undefined;
        const innerRef = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.mount(
          <DropdownContainer
            active={initialActive}
            managed={managed}
            innerRef={innerRef}
            as="div"
          >
            <DropdownContext.Consumer>
              {context => {
                contextState = context;
                return null;
              }}
            </DropdownContext.Consumer>
          </DropdownContainer>,
        );
        try {
          expect(contextState!.active).toBe(!!initialActive);
          contextState!.setActive(!contextState!.active);
          expect((wrapper.state() as DropdownContainerState).active).toBe(
            managed ? !!initialActive : !initialActive,
          );
        } finally {
          if (wrapper) {
            wrapper.unmount();
          }
        }
      }),
    ),
  );

  describe("propTypes", () => {
    const { propTypes } = Dropdown;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "active");
    validateOneOfPropType(propTypes, "align", DROPDOWN_ALIGNMENTS);
    validateBoolPropType(propTypes, "hoverable");
    validateBoolPropType(propTypes, "managed");
    validateBoolPropType(propTypes, "up");
  });
});
