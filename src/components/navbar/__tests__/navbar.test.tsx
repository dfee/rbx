import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/modifiers/color";
import {
  Navbar,
  NAVBAR_FIXED_ALIGNMENTS,
  NavbarController,
  NavbarControllerState,
} from "../navbar";
import { NavbarBrand } from "../navbar-brand";
import { NavbarBurger } from "../navbar-burger";
import { NavbarContext, NavbarContextState } from "../navbar-context";
import { NavbarDivider } from "../navbar-divider";
import { NavbarDropdown } from "../navbar-dropdown";
import { NavbarEnd } from "../navbar-end";
import { NavbarItem } from "../navbar-item";
import { NavbarLink } from "../navbar-link";
import { NavbarMenu } from "../navbar-menu";
import { NavbarStart } from "../navbar-start";

import { hasProperties } from "@/__tests__/helpers";

describe("Navbar component", () => {
  hasProperties(Navbar, {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Context: NavbarContext,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    End: NavbarEnd,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Start: NavbarStart,
    defaultProps: { as: "nav" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.mount(<Navbar />);
    try {
      expect(
        wrapper
          .find(NavbarController)
          .children()
          .is("nav"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.mount(<Navbar as={as} />);
    try {
      expect(
        wrapper
          .find(NavbarController)
          .children()
          .is(as),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Navbar active ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(
        wrapper
          .find(NavbarController)
          .children()
          .instance(),
      );
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.mount(<Navbar />);
    try {
      expect(
        wrapper
          .find(NavbarController)
          .children()
          .hasClass("navbar"),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.mount(<Navbar className={className} />);
    try {
      expect(
        wrapper
          .find(NavbarController)
          .children()
          .hasClass(className),
      ).toBe(true);
    } finally {
      wrapper.unmount();
    }
  });

  [false, true].map(active =>
    it("should render as active", () => {
      const wrapper = Enzyme.mount(
        <Navbar active={active}>
          <NavbarMenu />
        </Navbar>,
      );
      try {
        expect(
          wrapper
            .find(NavbarMenu)
            .children()
            .hasClass("is-active"),
        ).toBe(active);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(active =>
    it("should render as active", () => {
      const wrapper = Enzyme.mount(
        <Navbar active={active}>
          <NavbarMenu />
        </Navbar>,
      );
      try {
        expect(
          wrapper
            .find(NavbarMenu)
            .children()
            .hasClass("is-active"),
        ).toBe(active);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(managed =>
    it(`should render as ${
      managed ? "not " : ""
    }active when managed is ${managed}`, () => {
      const wrapper = Enzyme.mount(
        <Navbar managed={managed}>
          <NavbarMenu />
        </Navbar>,
      );
      try {
        wrapper.setProps({ active: true });
        expect(
          wrapper
            .find(NavbarMenu)
            .children()
            .hasClass("is-active"),
        ).toBe(managed);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.mount(<Navbar color={color} />);
      try {
        expect(
          wrapper
            .find(NavbarController)
            .children()
            .hasClass(`is-${color}`),
        ).toBe(true);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  NAVBAR_FIXED_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.mount(<Navbar fixed={align} />);
      try {
        expect(
          wrapper
            .find(NavbarController)
            .children()
            .hasClass(`is-fixed-${align}`),
        ).toBe(true);
        expect((document.documentElement as HTMLElement).className).toBe(
          `has-navbar-fixed-${align}`,
        );
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [false, true].map(transparent =>
    it(`should ${transparent ? "" : "not "}be transparent`, () => {
      const wrapper = Enzyme.mount(<Navbar transparent={transparent} />);
      try {
        expect(
          wrapper
            .find(NavbarController)
            .children()
            .hasClass("is-transparent"),
        ).toBe(transparent);
      } finally {
        wrapper.unmount();
      }
    }),
  );

  [undefined, false, true].map(initialActive =>
    [undefined, false, true].map(managed =>
      it(`should ${
        managed ? "" : "not "
      }set NavbarController's state.active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
        let contextState: NavbarContextState | undefined;
        const innerRef = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.mount(
          <NavbarController
            active={initialActive}
            managed={managed}
            innerRef={innerRef}
            as="div"
          >
            <NavbarContext.Consumer>
              {context => {
                contextState = context;
                return null;
              }}
            </NavbarContext.Consumer>
          </NavbarController>,
        );
        try {
          expect(contextState!.active).toBe(!!initialActive);
          contextState!.setActive(!contextState!.active);
          expect((wrapper.state() as NavbarControllerState).active).toBe(
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

  describe("ssr", () => {
    let initWindow: Window;

    beforeEach(() => {
      initWindow = (global as any).window;
      delete (global as any).window;
    });

    afterEach(() => {
      (global as any).window = initWindow;
    });

    it("should render without window being available (ssr)", () => {
      const ref = React.createRef<HTMLDivElement>();
      const wrapper = Enzyme.shallow(
        <NavbarController innerRef={ref} as="div" />,
      );
      expect(wrapper.children().hasClass("navbar")).toBe(true);
      wrapper.unmount();
      expect(wrapper.type()).toBeNull();
    });
  });
});
