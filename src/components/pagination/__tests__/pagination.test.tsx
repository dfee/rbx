import React from "react";

import {
  Pagination,
  PAGINATION_DEFAULTS,
} from "src/components/pagination/pagination";
import { PaginationEllipsis } from "src/components/pagination/pagination-ellipsis";
import { PaginationLink } from "src/components/pagination/pagination-link";
import { PaginationList } from "src/components/pagination/pagination-list";
import { PaginationStep } from "src/components/pagination/pagination-step";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Pagination;
const DISPLAY_NAME = "Pagination";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "pagination";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Step: PaginationStep,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      PAGINATION_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <Pagination align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Pagination rounded={rounded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      PAGINATION_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Pagination size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
