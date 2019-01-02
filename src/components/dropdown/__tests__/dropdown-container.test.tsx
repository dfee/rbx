import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import {
  DROPDOWN_ALIGNMENTS,
  DropdownContainer,
  DropdownContainerProps,
  DropdownContainerState,
} from "../dropdown-container";
import { DropdownContext, DropdownContextValue } from "../dropdown-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
} from "../../../__tests__/testing";

// const COMPONENT = DropdownContainer;
const COMPONENT_NAME = "DropdownContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "dropdown";

const makeNode = (props: DropdownContainerProps) => {
  return <DropdownContainer {...props} />;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const dropdownContextProviderWrapper = Enzyme.shallow(node);
  const forwardRefWrapper = dropdownContextProviderWrapper.children();
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
    describe("active", () => {
      [false, true].map(active =>
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        }),
      );
    });

    describe("align", () => {
      DROPDOWN_ALIGNMENTS.map(align =>
        it(`should be aligned ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
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
        // For example, if we click a dropdown-divider
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
          }set DropdownContainer's state.active (${initialActive} as ${!!initialActive} -> ${!initialActive}) when managed is ${managed}`, () => {
            let contextValue: DropdownContextValue | undefined;
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
                    contextValue = context;
                    return null;
                  }}
                </DropdownContext.Consumer>
              </DropdownContainer>,
            );

            try {
              expect(contextValue!.active).toBe(!!initialActive);
              contextValue!.setActive(!contextValue!.active);
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
    });

    describe("up", () => {
      [false, true].map(up =>
        it(`should ${up ? "" : "not "}be up`, () => {
          const node = makeNode({ up });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-up")).toBe(up);
        }),
      );
    });
  });
});
