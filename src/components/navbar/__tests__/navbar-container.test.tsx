import Enzyme from "enzyme";
import { JSDOM } from "jsdom";
import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  NAVBAR_DEFAULTS,
  NavbarContainer,
  NavbarContainerState,
} from "src/components/navbar/navbar-container";
import {
  NavbarContext,
  NavbarContextValue,
} from "src/components/navbar/navbar-context";
import { canUseDOM } from "src/utils";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  withEnzymeMount,
} from "src/__tests__/testing";
import { MockCanUseDomFunction } from "src/__mocks__/utils";

jest.mock("src/utils");

const COMPONENT = NavbarContainer;
const DISPLAY_NAME = "Navbar.Container";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar";

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

describe(`${DISPLAY_NAME} component`, () => {
  beforeEach(() => {
    (canUseDOM as MockCanUseDomFunction).__set(true);
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
    refProp: "innerRef",
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  describe("ssr", () => {
    it("should render without window being available (ssr)", () => {
      (canUseDOM as MockCanUseDomFunction).__set(false);
      const ref = React.createRef<HTMLDivElement>();
      const wrapper = Enzyme.shallow(<NavbarContainer innerRef={ref} />);
      expect(wrapper.children().hasClass("navbar")).toBe(true);
      wrapper.unmount();
      expect(wrapper.type()).toBeNull();
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
          const node = <NavbarContainer color={color} />;
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
          const node = (
            <NavbarContainer document={doc} innerRef={ref} fixed="top" />
          );
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
          const node = <NavbarContainer fixed={fixed} />;
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
          const node = <NavbarContainer transparent={transparent} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-transparent")).toBe(transparent);
        });
      });
    });
  });
});
