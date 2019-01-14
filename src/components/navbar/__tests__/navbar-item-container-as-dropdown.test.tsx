import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
  NavbarItemContainerState,
} from "src/components/navbar/navbar-item-container";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "src/components/navbar/navbar-item-context";
import { Omit } from "src/types";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
} from "src/__tests__/testing";

// const COMPONENT = NavbarItemContainer;
const COMPONENT_NAME = "NavbarItemContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-item";

const makeNode = (props: Omit<NavbarItemContainerProps, "dropdown">) => (
  <NavbarItemContainer dropdown {...props} />
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
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
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

  describe("props", () => {
    describe("as", () => {
      it("should force as to be div if a", () => {
        const node = makeNode({ as: "a" });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(wrapper.is("div")).toBe(true);
      });
    });

    describe("managed", () => {
      [false, true].map(managed =>
        [false, true].map(active => {
          const isToggleable = managed && active;
          it(`should ${
            isToggleable ? "" : "not "
          }be toggled when document is clicked and managed: ${managed} and active: ${active}
              `, () => {
            const node = makeNode({ active, managed });
            withEnzymeMount({ node }, ({ state: { outer } }) => {
              document.getElementsByTagName("body")[0].click();
              outer.update();
              expect(
                outer
                  .find(`${DEFAULT_ELEMENT}.${BULMA_CLASS_NAME}`)
                  .hasClass("is-active"),
              ).toBe(isToggleable);
            });
          });
        }),
      );

      it("should not be disabled if component is the target of click", () => {
        // For example, if we click a divider
        const root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.appendChild(root);
        const ref = React.createRef<HTMLDivElement>();
        const node = makeNode({ active: true, innerRef: ref });
        withEnzymeMount(
          { node, options: { attachTo: root } },
          ({ state: { outer } }) => {
            (ref.current as HTMLDivElement).click();
            outer.update();
            expect(
              outer
                .find(`${DEFAULT_ELEMENT}.${BULMA_CLASS_NAME}`)
                .hasClass("is-active"),
            ).toBe(true);
          },
        );
      });

      [undefined, false, true].map(initialActive =>
        [undefined, false, true].map(managed => {
          const initialActiveAsBool = initialActive === true;
          it(`should ${
            managed === true ? "" : "not "
          }set NavbarItemContainer's state.active (${initialActive} as ${initialActiveAsBool} -> ${!initialActiveAsBool})`, () => {
            let contextValue: NavbarItemContextValue | undefined;
            const innerRef = React.createRef<HTMLDivElement>();
            const wrapper = Enzyme.mount(
              <NavbarItemContainer
                dropdown
                active={initialActive}
                managed={managed}
                innerRef={innerRef}
              >
                <NavbarItemContext.Consumer>
                  {context => {
                    contextValue = context;

                    return undefined;
                  }}
                </NavbarItemContext.Consumer>
              </NavbarItemContainer>,
            );
            try {
              if (contextValue === undefined) {
                throw new Error("should have contextValue");
              }
              expect(contextValue.active).toBe(initialActiveAsBool);
              contextValue.setActive(!contextValue.active);
              expect((wrapper.state() as NavbarItemContainerState).active).toBe(
                managed === true ? initialActiveAsBool : !initialActiveAsBool,
              );
            } finally {
              wrapper.unmount();
            }
          });
        }),
      );
    });

    describe("hoverable", () => {
      [false, true].map(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = makeNode({ hoverable });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });

    describe("up", () => {
      [false, true].map(up => {
        it(`should ${up ? "" : "not "}have dropdown-up`, () => {
          const node = makeNode({ up });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-dropdown-up")).toBe(up);
        });
      });
    });
  });
});
