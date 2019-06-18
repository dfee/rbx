import Enzyme from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";

import { Dropdown, DROPDOWN_DEFAULTS } from "src/components/dropdown/dropdown";
import { DropdownContent } from "src/components/dropdown/dropdown-content";
import {
  DropdownContext,
  DropdownContextValue,
} from "src/components/dropdown/dropdown-context";
import { DropdownDivider } from "src/components/dropdown/dropdown-divider";
import { DropdownItem } from "src/components/dropdown/dropdown-item";
import { DropdownMenu } from "src/components/dropdown/dropdown-menu";
import { DropdownTrigger } from "src/components/dropdown/dropdown-trigger";

import {
  GetInnerShallowWrapperFunction,
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
  withEnzymeMount,
} from "src/__tests__/testing";
import { makeReactWrapperFactory } from "./testing";

const COMPONENT = Dropdown;
const DISPLAY_NAME = "Dropdown";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "dropdown";

const getLeafInnerShallowWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // Component
    .dive() // ContextProvider
    .dive() // Generic
    .dive(); // Leaf ("as")

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperFactory(getLeafInnerShallowWrapper),
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperFactory(getLeafInnerShallowWrapper),
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeReactWrapper = makeReactWrapperFactory();

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <Dropdown active={active} />;
          const wrapper = makeReactWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      DROPDOWN_DEFAULTS.alignments.map(align => {
        it(`should be aligned ${align}`, () => {
          const node = <Dropdown align={align} />;
          const wrapper = makeReactWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].map(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = <Dropdown hoverable={hoverable} />;
          const wrapper = makeReactWrapper({ node });
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });

    describe("managed", () => {
      validateBoolPropType(propTypes, "managed");

      [false, true].map(managed =>
        [false, true].map(active => {
          const isToggleable = managed && active;
          it(`should ${
            isToggleable ? "" : "not "
          }be toggled when document is clicked and managed: ${managed} and active: ${active}
          `, () => {
            const node = <Dropdown active={active} managed={managed} />;

            withEnzymeMount({ node }, ({ state: { outer } }) => {
              act(() => document.getElementsByTagName("body")[0].click());
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
        // For example, if we click a dropdown-divider
        const root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.appendChild(root);

        const ref = React.createRef<HTMLDivElement>();
        const node = <Dropdown active ref={ref} />;

        withEnzymeMount(
          { node, options: { attachTo: root } },
          ({ state: { outer } }) => {
            act(() => (ref.current as HTMLDivElement).click());
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
          const isManaged = managed === true;
          const initialActiveAsBool = initialActive === true;
          it(`should ${
            isManaged ? "" : "not "
          }set DropdownContainer's state.active (${initialActive} as ${initialActiveAsBool} -> ${!initialActiveAsBool})`, () => {
            let contextValue: DropdownContextValue | undefined;
            const ref = React.createRef<HTMLDivElement>();
            const wrapper = Enzyme.mount(
              <Dropdown
                active={initialActive}
                managed={managed}
                ref={ref}
                as="div"
              >
                <DropdownContext.Consumer>
                  {context => {
                    contextValue = context;

                    return undefined;
                  }}
                </DropdownContext.Consumer>
              </Dropdown>,
            );

            try {
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
              wrapper.update();

              const innerShallowWrapper = wrapper // Dropdown
                .children() // Generic
                .children(); // Leaf ("as")

              expect(innerShallowWrapper.hasClass("is-active")).toBe(
                isManaged ? initialActiveAsBool : !initialActiveAsBool,
              );
            } finally {
              wrapper.unmount();
            }
          });
        }),
      );
    });

    describe("up", () => {
      validateBoolPropType(propTypes, "up");

      [false, true].map(up => {
        it(`should ${up ? "" : "not "}be up`, () => {
          const node = <Dropdown up={up} />;
          const wrapper = makeReactWrapper({ node });
          expect(wrapper.hasClass("is-up")).toBe(up);
        });
      });
    });
  });
});
