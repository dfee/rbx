import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import {
  Select,
  SELECT_CONTAINER_DEFAULTS,
  SelectContainer,
} from "src/elements/form/select";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = SelectContainer;
const DISPLAY_NAME = "Select.Container";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "select";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    VARIABLE_DEFAULTS: SELECT_CONTAINER_DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <SelectContainer color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].forEach(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = <SelectContainer fullwidth={fullwidth} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].forEach(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <SelectContainer rounded={rounded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      SELECT_CONTAINER_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <SelectContainer size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateStringOrNumberPropType(propTypes, "state");

      SELECT_CONTAINER_DEFAULTS.states.forEach(state => {
        [
          { discriminator: "select" },
          { discriminator: "component" },
          { discriminator: "string" },
        ].forEach(({ discriminator }) => {
          it(`should have state ${state} for discriminator ${discriminator}`, () => {
            let children: JSX.Element | string;
            if (discriminator === "select") {
              children = <select />;
            } else if (discriminator === "component") {
              children = <Select />;
            } else {
              children = discriminator;
            }
            const node = (
              <SelectContainer state={state}>{children}</SelectContainer>
            );
            const wrapper = makeShallowWrapper({ node });
            if (state === "loading") {
              expect(wrapper.hasClass("is-loading")).toBe(true);
            } else if (
              discriminator === "select" ||
              discriminator === "component"
            ) {
              expect(wrapper.children().hasClass(`is-${state}`)).toBe(true);
            }
          });
        });
      });
    });

    describe("multiple", () => {
      [false, true].forEach(multiple => {
        [
          { childType: "select" },
          { childType: "component" },
          { childType: "compound" },
          { childType: "fragment" },
          { childType: "fragment-empty" },
          { childType: "empty" },
          { childType: "string" },
        ]
          .filter(
            ({ childType }) =>
              !(
                ["string", "fragment-empty", "empty"].includes(childType) &&
                multiple
              ),
          )
          .forEach(({ childType }) => {
            const isMultiple =
              ["select", "component", "compound", "fragment"].includes(
                childType,
              ) && multiple;

            it(`should ${
              isMultiple ? "" : "not "
            }be multiple for childType ${childType}`, () => {
              let children: JSX.Element | string | JSX.Element[] | undefined;
              if (childType === "select") {
                children = <select multiple={multiple} />;
              } else if (childType === "component") {
                children = <Select multiple={multiple} />;
              } else if (childType === "compound") {
                children = [
                  React.createElement("div"),
                  React.createElement("select", { multiple }),
                ];
              } else if (childType === "fragment") {
                children = (
                  <>
                    <div />
                    <Select multiple={multiple} />;
                  </>
                );
              } else if (childType === "fragment-empty") {
                children = <></>;
              } else if (childType === "empty") {
                children = undefined;
              } else {
                children = childType;
              }
              const node = <SelectContainer>{children}</SelectContainer>;
              const wrapper = makeShallowWrapper({ node });
              expect(wrapper.hasClass("is-multiple")).toBe(isMultiple);
            });
          });
      });
    });
  });
});
