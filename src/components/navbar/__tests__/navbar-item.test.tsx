import React from "react";

import { NavbarItem } from "src/components/navbar/navbar-item";
import { initialValue as navbarInitialValue } from "src/components/navbar/navbar-context";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "src/components/navbar/navbar-item-context";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
  withEnzymeMount,
  GetInnerReactWrapperFunction,
} from "src/__tests__/testing";

import {
  makeShallowWrapperInNavbarContextFactory,
  makeReactWrapperInNavbarContextFactory,
  makeReactWrapperInNavbarItemContextFactory,
  getInnerReactWrapperInNavbarItemContext,
  // makeShallowWrapperInNavbarItemContextFactory,
} from "./testing";
import { act } from "react-dom/test-utils";

const COMPONENT = NavbarItem;
const DISPLAY_NAME = "Navbar.Item";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "navbar-item";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperInNavbarContextFactory(),
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperInNavbarContextFactory();

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [undefined, false, true].map(active => {
        [undefined, false, true].map(managed => {
          const expected = Boolean(managed) && Boolean(active);
          it(`should ${
            expected ? "" : "not "
          }be active with active: ${JSON.stringify(
            active,
          )}, managed: ${JSON.stringify(managed)}`, () => {
            const node = <NavbarItem active={active} managed={managed} />;
            const wrapper = makeShallowWrapper({ node });
            expect(wrapper.hasClass("is-active")).toBe(expected);
          });
        });
      });
    });

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].map(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = <NavbarItem expanded={expanded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("managed", () => {
      validateBoolPropType(propTypes, "managed");
    });

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => undefined, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick => {
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = hasOnClick ? jest.fn() : undefined;
          const setActive = jest.fn();

          const makeReactWrapper = makeReactWrapperInNavbarItemContextFactory(
            getInnerReactWrapperInNavbarItemContext,
            navbarInitialValue,
            { active: false, setActive },
          );

          const node = <NavbarItem onClick={onClick} />;
          const wrapper = makeReactWrapper({ node });
          wrapper.simulate("click");

          if (onClick !== undefined) {
            expect(onClick.mock.calls).toHaveLength(1);
          }
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        });
      });
    });

    describe("tab", () => {
      validateBoolPropType(propTypes, "tab");

      [false, true].map(tab => {
        it(`should ${tab ? "" : "not "}be tab`, () => {
          const node = <NavbarItem tab={tab} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-tab")).toBe(tab);
        });
      });
    });
  });

  describe("props [for dropdown]", () => {
    // this creates a NavbarItemContextFactory
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperInNavbarContextFactory(
      wrapper =>
        wrapper // Navbar ContextProvider
          .dive() // NavbarItem ContextProvider
          .dive() // Component
          .dive() // Generic
          .dive(), // Leaf ("as")
    );

    describe("as", () => {
      it("should passthrough custom 'as' (if not 'a')", () => {
        const node = <NavbarItem dropdown as="span" />;
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.is("span")).toBe(true);
      });

      it("should force 'as' to be 'div' if 'a'", () => {
        const node = <NavbarItem dropdown as="a" />;
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.is("div")).toBe(true);
      });
    });

    describe("managed", () => {
      const getInnerLeafReactWrapper: GetInnerReactWrapperFunction = wrapper =>
        wrapper
          .children()
          .children()
          .children();

      [false, true].map(managed =>
        [false, true].map(active => {
          const isToggleable = managed && active;
          it(`should ${
            isToggleable ? "" : "not "
          }be toggled when document is clicked and managed: ${managed} and active: ${active}
              `, () => {
            const node = (
              <NavbarItem dropdown active={active} managed={managed} />
            );
            withEnzymeMount({ node }, ({ state: { outer } }) => {
              act(() => document.getElementsByTagName("body")[0].click());
              outer.update();
              const leafReactWrapper = getInnerLeafReactWrapper(outer);
              expect(leafReactWrapper.hasClass("is-active")).toBe(isToggleable);
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
        const node = <NavbarItem dropdown active ref={ref} />;
        withEnzymeMount(
          { node, options: { attachTo: root } },
          ({ state: { outer } }) => {
            act(() => (ref.current as HTMLDivElement).click());
            outer.update();
            const leafReactWrapper = getInnerLeafReactWrapper(outer);
            expect(leafReactWrapper.hasClass("is-active")).toBe(true);
          },
        );
      });

      [undefined, false, true].map(initialActive =>
        [undefined, false, true].map(managed => {
          const initialActiveAsBool = initialActive === true;
          it(`should ${
            managed === true ? "" : "not "
          }set NavbarItem's state.active (${initialActive} as ${initialActiveAsBool} -> ${!initialActiveAsBool})`, () => {
            let contextValue: NavbarItemContextValue | undefined;

            const ref = React.createRef<HTMLDivElement>();
            const node = (
              <NavbarItem
                dropdown
                active={initialActive}
                managed={managed}
                ref={ref}
              >
                <NavbarItemContext.Consumer>
                  {context => {
                    contextValue = context;
                    return undefined;
                  }}
                </NavbarItemContext.Consumer>
              </NavbarItem>
            );

            withEnzymeMount({ node }, ({ context: { wrapper } }) => {
              if (contextValue === undefined) {
                throw new Error("should have contextValue");
              }
              expect(contextValue.active).toBe(initialActiveAsBool);
              act(() => {
                if (contextValue === undefined) {
                  throw new Error("should have contextValue");
                }
                contextValue.setActive(!contextValue.active);
              });

              expect(contextValue.active).toBe(
                managed === true ? initialActiveAsBool : !initialActiveAsBool,
              );
            });
          });
        }),
      );
    });

    describe("dropdown", () => {
      validateBoolPropType(propTypes, "dropdown");

      it("should be a dropdown", () => {
        const node = <NavbarItem dropdown />;
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.hasClass("is-dropdown"));
      });
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = <NavbarItem dropdown hoverable={hoverable} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });

    describe("up", () => {
      validateBoolPropType(propTypes, "up");

      [false, true].map(up => {
        it(`should ${up ? "" : "not "}have dropdown-up`, () => {
          const node = <NavbarItem dropdown up={up} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-dropdown-up")).toBe(up);
        });
      });
    });
  });
});
