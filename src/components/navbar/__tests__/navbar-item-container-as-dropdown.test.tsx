import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { Omit } from "../../../types";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
  NavbarItemContainerState,
} from "../navbar-item-container";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "../navbar-item-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
} from "../../../__tests__/testing";

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

  describe("props", () => {
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
        [undefined, false, true].map(managed =>
          it(`should ${
            managed ? "" : "not "
          }set NavbarItemContainer's state.active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
            let contextValue: NavbarItemContextValue | undefined;
            const innerRef = React.createRef<HTMLDivElement>();
            const wrapper = Enzyme.mount(
              <NavbarItemContainer
                dropdown
                active={initialActive}
                managed={managed}
                innerRef={innerRef}
                as="div"
              >
                <NavbarItemContext.Consumer>
                  {context => {
                    contextValue = context;
                    return null;
                  }}
                </NavbarItemContext.Consumer>
              </NavbarItemContainer>,
            );
            try {
              expect(contextValue!.active).toBe(!!initialActive);
              contextValue!.setActive(!contextValue!.active);
              expect((wrapper.state() as NavbarItemContainerState).active).toBe(
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

    describe("dropdownUp", () => {
      [false, true].map(dropdownUp =>
        it(`should ${dropdownUp ? "" : "not "}have dropdown-up`, () => {
          const node = makeNode({ dropdownUp });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-dropdown-up")).toBe(dropdownUp);
        }),
      );
    });

    describe("hoverable", () => {
      [false, true].map(hoverable =>
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = makeNode({ hoverable });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        }),
      );
    });
  });
});

// import Enzyme from "enzyme";
// import React from "react";

// import { NavbarItem, NavbarItemContainer } from "../navbar-item";
// import {
//   NavbarItemContext,
//   NavbarItemContextState,
// } from "../navbar-item-context";

// import {
//   hasProperties,
//   // shallowInContext,
//   testGenericPropTypes,
//   validateBoolPropType,
//   validatePropType,
// } from "../../../__tests__/testing";
// import { navbarItemContextFactory } from "./context";

// describe("NavbarItem component", () => {
//   hasProperties(NavbarItem, {
//     defaultProps: { as: "a" },
//   });

//   it("should forward ref", () => {
//     const ref = React.createRef<HTMLAnchorElement>();
//     // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
//     const wrapper = Enzyme.mount(
//       <div>
//         <NavbarItem ref={ref} />
//       </div>,
//     );
//     try {
//       expect(ref.current).toBe(wrapper.find(".navbar-item").instance());
//     } finally {
//       wrapper.unmount();
//     }
//   });

//   [false, true].map(active =>
//     it(`should ${active ? "" : "not "}be active`, () => {
//       const wrapper = Enzyme.mount(<NavbarItem active={active} />);
//       try {
//         const children = wrapper.find(NavbarItemContainer).children();
//         expect(children.hasClass("is-active")).toBe(active);
//       } finally {
//         wrapper.unmount();
//       }
//     }),
//   );

//   describe("NavbarItem: as NOT dropdown", () => {
//     it("should render as the default element", () => {
//       const wrapper = Enzyme.mount(<NavbarItem />);
//       try {
//         const children = wrapper.find(NavbarItemContainer).children();
//         expect(children.is("a")).toBe(true);
//       } finally {
//         wrapper.unmount();
//       }
//     });

//     it("should render as a custom component", () => {
//       const as = "span";
//       const wrapper = Enzyme.mount(<NavbarItem as={as} />);
//       try {
//         const children = wrapper.find(NavbarItemContainer).children();
//         expect(children.is(as)).toBe(true);
//       } finally {
//         wrapper.unmount();
//       }
//     });

//     it("should have bulma className", () => {
//       const wrapper = Enzyme.mount(<NavbarItem />);
//       try {
//         const children = wrapper.find(NavbarItemContainer).children();
//         expect(children.hasClass("navbar-item")).toBe(true);
//         expect(children.hasClass("has-dropdown")).toBe(false);
//       } finally {
//         wrapper.unmount();
//       }
//     });

//     [false, true].map(hasOnClick =>
//       it(`should update context ${
//         hasOnClick ? "and call provided onClick" : ""
//       }`, () => {
//         const onClick = jest.fn();
//         const setActive = jest.fn();
//         const innerRef = React.createRef<HTMLAnchorElement>();
//         const outer = Enzyme.shallow(
//           <NavbarItemContainer
//             innerRef={innerRef}
//             as="a"
//             onClick={hasOnClick ? onClick : undefined}
//           />,
//         );
//         const Children = outer.props().children;
//         const context = navbarItemContextFactory({ active: false, setActive });
//         const wrapper = Enzyme.shallow(<Children {...context} />);
//         wrapper.simulate("click");
//         expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
//         expect(setActive.mock.calls).toHaveLength(1);
//         expect(setActive.mock.calls[0]).toEqual([true]);
//       }),
//     );

//     describe("NavbarItem: as dropdown", () => {
//       it("should render as the default element", () => {
//         const wrapper = Enzyme.mount(<NavbarItem dropdown />);
//         try {
//           const children = wrapper.find(NavbarItemContainer).children();
//           expect(children.is("div")).toBe(true);
//         } finally {
//           wrapper.unmount();
//         }
//       });

//       it("should render as a custom component", () => {
//         const as = "span";
//         const wrapper = Enzyme.mount(<NavbarItem dropdown as={as} />);
//         try {
//           const children = wrapper.find(NavbarItemContainer).children();
//           expect(children.is(as)).toBe(true);
//         } finally {
//           wrapper.unmount();
//         }
//       });

//       it("should have bulma className", () => {
//         const wrapper = Enzyme.mount(<NavbarItem dropdown />);
//         try {
//           const children = wrapper.find(NavbarItemContainer).children();
//           expect(children.hasClass("navbar-item")).toBe(true);
//           expect(children.hasClass("has-dropdown")).toBe(true);
//         } finally {
//           wrapper.unmount();
//         }
//       });

//       [false, true].map(dropdownUp =>
//         it(`should ${dropdownUp ? "" : "not "}be dropdownUp`, () => {
//           const wrapper = Enzyme.mount(
//             <NavbarItem dropdown dropdownUp={dropdownUp} />,
//           );
//           try {
//             const children = wrapper.find(NavbarItemContainer).children();
//             expect(children.hasClass("has-dropdown-up")).toBe(dropdownUp);
//           } finally {
//             wrapper.unmount();
//           }
//         }),
//       );

//       [false, true].map(hoverable =>
//         it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
//           const wrapper = Enzyme.mount(
//             <NavbarItem dropdown hoverable={hoverable} />,
//           );
//           try {
//             const children = wrapper.find(NavbarItemContainer).children();
//             expect(children.hasClass("is-hoverable")).toBe(hoverable);
//           } finally {
//             wrapper.unmount();
//           }
//         }),
//       );

//       [false, true].map(managed =>
//         it(`should ${
//           managed ? "not " : ""
//         }be disabled on click in document when managed is ${managed}`, () => {
//           const wrapper = Enzyme.mount(
//             <NavbarItem dropdown active managed={managed} />,
//           );
//           try {
//             document.getElementsByTagName("body")[0].click();
//             wrapper.update();
//             expect(wrapper.find(".navbar-item").hasClass("is-active")).toBe(
//               managed,
//             );
//           } finally {
//             wrapper.unmount();
//           }
//         }),
//       );

//       [undefined, false, true].map(initialActive =>
//         [undefined, false, true].map(managed =>
//           it(`should ${
//             managed ? "" : "not "
//           }set NavbarItemContainer's state.active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
//             let contextState: NavbarItemContextState | undefined;
//             const innerRef = React.createRef<HTMLDivElement>();
//             const wrapper = Enzyme.mount(
//               <NavbarItemContainer
//                 active={initialActive}
//                 managed={managed}
//                 innerRef={innerRef}
//                 dropdown
//                 as="div"
//               >
//                 <NavbarItemContext.Consumer>
//                   {context => {
//                     contextState = context;
//                     return null;
//                   }}
//                 </NavbarItemContext.Consumer>
//               </NavbarItemContainer>,
//             );
//             try {
//               expect(contextState!.active).toBe(!!initialActive);
//               contextState!.setActive(!contextState!.active);
//               expect((wrapper.state() as NavbarItemContextState).active).toBe(
//                 managed ? !!initialActive : !initialActive,
//               );
//             } finally {
//               if (wrapper) {
//                 wrapper.unmount();
//               }
//             }
//           }),
//         ),
//       );

//       it("should not be disabled if component is the target of click", () => {
//         // For example, if we click a dropdown-divider
//         const root = document.createElement("div");
//         root.setAttribute("id", "root");
//         document.body.appendChild(root);
//         let wrapper;

//         try {
//           const ref = React.createRef<HTMLDivElement>();
//           // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
//           wrapper = Enzyme.mount(
//             <div>
//               <NavbarItem dropdown active ref={ref} as="div" />
//             </div>,
//             { attachTo: root },
//           );
//           (ref.current as HTMLDivElement).click();
//           wrapper.children().update();
//           expect(wrapper.find(".navbar-item").hasClass("is-active")).toBe(true);
//         } finally {
//           if (wrapper) {
//             wrapper.unmount();
//           }
//           document.body.removeChild(root);
//         }
//       });
//     });
//   });

//   describe("propTypes", () => {
//     const { propTypes } = NavbarItem;
//     testGenericPropTypes(propTypes);
//     validateBoolPropType(propTypes, "active");
//     validateBoolPropType(propTypes, "dropdown");
//     validateBoolPropType(propTypes, "dropdownUp");
//     validateBoolPropType(propTypes, "hoverable");
//     validateBoolPropType(propTypes, "managed");
//     validatePropType(propTypes, "onClick", [
//       { value: () => null, valid: true, descriptor: "func" },
//       { value: "string", valid: false },
//     ]);
//   });
// });
