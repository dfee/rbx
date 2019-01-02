import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "../../../base/helpers";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import {
  NAVBAR_FIXED_ALIGNMENTS,
  NavbarContainer,
  NavbarContainerProps,
  NavbarContainerState,
} from "../navbar-container";
import { NavbarContext, NavbarContextValue } from "../navbar-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
} from "../../../__tests__/testing";

// const COMPONENT = NavbarContainer;
const COMPONENT_NAME = "NavbarContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar";

const makeNode = (props: NavbarContainerProps) => (
  <NavbarContainer {...props} />
);

const makeShallowWrapper = (node: JSX.Element) => {
  // render in Context Provider
  const navbarItemContextProviderWrapper = Enzyme.shallow(node);
  return navbarItemContextProviderWrapper.children();
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const forwardRefWrapper = makeShallowWrapper(node);
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
    "innerRef",
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("ssr", () => {
    it("should render without window being available (ssr)", () => {
      const initialWindow = (global as any).window;
      try {
        delete (global as any).window;
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.shallow(
          <NavbarContainer innerRef={ref} as="div" />,
        );
        expect(wrapper.children().hasClass("navbar")).toBe(true);
        wrapper.unmount();
        expect(wrapper.type()).toBeNull();
      } finally {
        (global as any).window = initialWindow;
      }
    });
  });

  describe("props", () => {
    describe("active", () => {
      [false, true].map(active =>
        it(`should set active: ${active} in context`, () => {
          let contextValue: NavbarContextValue | undefined;
          const node = (
            <NavbarContainer active={active}>
              <NavbarContext.Consumer
                children={context => {
                  contextValue = context;
                  return null;
                }}
              />
            </NavbarContainer>
          );
          withEnzymeMount({ node }, () => {
            expect(contextValue!.active).toEqual(active);
          });
        }),
      );
    });

    describe("color", () => {
      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });

    describe("fixed", () => {
      NAVBAR_FIXED_ALIGNMENTS.map(fixed =>
        it(`should be ${fixed}`, () => {
          const node = makeNode({ fixed });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-fixed-${fixed}`)).toBe(true);
        }),
      );
    });

    describe("managed", () => {
      [undefined, false, true].map(initialActive =>
        [undefined, false, true].map(managed =>
          it(`should ${
            managed ? "" : "not "
          }set NavbarContext's active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
            let contextState: NavbarContextValue | undefined;
            const innerRef = React.createRef<HTMLDivElement>();
            const wrapper = Enzyme.mount(
              <NavbarContainer
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
              </NavbarContainer>,
            );
            try {
              expect(contextState!.active).toBe(!!initialActive);
              contextState!.setActive(!contextState!.active);
              expect((wrapper.state() as NavbarContainerState).active).toBe(
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
    });

    describe("transparent", () => {
      [false, true].map(transparent =>
        it(`should ${transparent ? "" : "not "}be transparent`, () => {
          const node = makeNode({ transparent });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-transparent")).toBe(transparent);
        }),
      );
    });
  });
});
