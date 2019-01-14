import * as Enzyme from "enzyme";
import { JSDOM } from "jsdom";
import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  NAVBAR_DEFAULTS,
  NavbarContainer,
  NavbarContainerProps,
  NavbarContainerState,
} from "src/components/navbar/navbar-container";
import {
  NavbarContext,
  NavbarContextValue,
} from "src/components/navbar/navbar-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
  withWindow,
} from "src/__tests__/testing";

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

  describe("ssr", () => {
    it("should render without window being available (ssr)", () => {
      withWindow({}, () => {
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = Enzyme.shallow(<NavbarContainer innerRef={ref} />);
        expect(wrapper.children().hasClass("navbar")).toBe(true);
        wrapper.unmount();
        expect(wrapper.type()).toBeNull();
      });
    });
  });

  describe("props", () => {
    describe("active", () => {
      [false, true].map(active => {
        it(`should set active: ${active} in context`, () => {
          let contextValue: NavbarContextValue | undefined;
          const node = (
            <NavbarContainer active={active}>
              <NavbarContext.Consumer>
                {context => {
                  contextValue = context;

                  return undefined;
                }}
              </NavbarContext.Consumer>
              />
            </NavbarContainer>
          );
          withEnzymeMount({ node }, () => {
            if (contextValue === undefined) {
              throw new Error("should have contextValue");
            }
            expect(contextValue.active).toEqual(active);
          });
        });
      });
    });

    describe("color", () => {
      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("document", () => {
      ["global", "provided"].map(docOpt => {
        it(`should use the ${docOpt} document`, () => {
          const ref = React.createRef<HTMLElement>();
          const doc =
            docOpt === "global" ? window.document : new JSDOM().window.document;
          const node = makeNode({ document: doc, innerRef: ref, fixed: "top" });
          withEnzymeMount({ node }, () => {
            if (docOpt === "provided") {
              // make sure we're doing this right.
              expect(doc).not.toBe(window.document);
            }
            if (ref.current === null) {
              throw new Error("ref should be set");
            }
            const docHtml = doc.querySelector("html");
            if (docHtml === null) {
              throw new Error("doc html should exist");
            }
            expect(docHtml.className).toBe("has-navbar-fixed-top");
          });
        });
      });
    });

    describe("fixed", () => {
      NAVBAR_DEFAULTS.fixedAlignments.map(fixed => {
        it(`should be ${fixed}`, () => {
          const node = makeNode({ fixed });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-fixed-${fixed}`)).toBe(true);
        });
      });
    });

    describe("managed", () => {
      [undefined, false, true].map(initialActive =>
        [undefined, false, true].map(managed => {
          const initialActiveAsBool = initialActive === true;
          it(`should ${
            managed === true ? "" : "not "
          }set NavbarContext's active (${initialActive} as ${initialActiveAsBool} -> ${!initialActiveAsBool})`, () => {
            let contextState: NavbarContextValue | undefined;
            const innerRef = React.createRef<HTMLDivElement>();
            const wrapper = Enzyme.mount(
              <NavbarContainer
                active={initialActive}
                managed={managed}
                innerRef={innerRef}
              >
                <NavbarContext.Consumer>
                  {context => {
                    contextState = context;

                    return undefined;
                  }}
                </NavbarContext.Consumer>
              </NavbarContainer>,
            );
            try {
              if (contextState === undefined) {
                throw new Error("should have contextState");
              }

              expect(contextState.active).toBe(initialActiveAsBool);
              contextState.setActive(!contextState.active);
              expect((wrapper.state() as NavbarContainerState).active).toBe(
                managed === true ? initialActiveAsBool : !initialActiveAsBool,
              );
            } finally {
              wrapper.unmount();
            }
          });
        }),
      );
    });

    describe("transparent", () => {
      [false, true].map(transparent => {
        it(`should ${transparent ? "" : "not "}be transparent`, () => {
          const node = makeNode({ transparent });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-transparent")).toBe(transparent);
        });
      });
    });
  });
});
