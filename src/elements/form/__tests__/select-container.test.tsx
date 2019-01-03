import * as React from "react";

import { COLORS } from "src/base/helpers";
import {
  Select,
  SELECT_CONTAINER_SIZES,
  SELECT_CONTAINER_STATES,
  SelectContainer,
} from "src/elements/form/select";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = SelectContainer;
const COMPONENT_NAME = "SelectContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "select";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", SELECT_CONTAINER_SIZES);

      SELECT_CONTAINER_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateOneOfPropType(propTypes, "state", SELECT_CONTAINER_STATES);

      SELECT_CONTAINER_STATES.map(state => {
        [
          { discriminator: "select" },
          { discriminator: "component" },
          { discriminator: "string" },
        ].map(({ discriminator }) => {
          it(`should have state ${state} for discriminator ${discriminator}`, () => {
            let children: JSX.Element | string;
            if (discriminator === "select") {
              children = <select />;
            } else if (discriminator === "component") {
              children = <Select />;
            } else {
              children = discriminator;
            }
            const node = makeNode({ children, state });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
            if (state === "loading") {
              expect(wrapper.hasClass("is-loading")).toBe(true);
            } else {
              if (discriminator === "select" || discriminator === "component") {
                expect(wrapper.children().hasClass(`is-${state}`)).toBe(true);
              }
            }
          });
        });
      });
    });

    describe("multiple", () => {
      [false, true].map(multiple => {
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
                ["string", "fragment-empty", "empty"].indexOf(childType) !==
                  -1 && multiple
              ),
          )
          .map(({ childType }) => {
            const isMultiple =
              ["select", "component", "compound", "fragment"].indexOf(
                childType,
              ) !== -1 && multiple;

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
                  <React.Fragment>
                    <div />
                    <Select multiple={multiple} />;
                  </React.Fragment>
                );
              } else if (childType === "fragment-empty") {
                children = <React.Fragment />;
              } else if (childType === "empty") {
                children = undefined;
              } else {
                children = childType;
              }
              const node = makeNode({ children });
              const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
                node,
              );
              expect(wrapper.hasClass("is-multiple")).toBe(isMultiple);
            });
          });
      });
    });
  });
});
