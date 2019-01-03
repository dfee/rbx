import {
  Pagination,
  PAGINATION_ALIGNMENTS,
  PAGINATION_SIZES,
} from "src/components/pagination/pagination";
import { PaginationEllipsis } from "src/components/pagination/pagination-ellipsis";
import { PaginationLink } from "src/components/pagination/pagination-link";
import { PaginationList } from "src/components/pagination/pagination-list";
import { PaginationNext } from "src/components/pagination/pagination-next";
import { PaginationPrevious } from "src/components/pagination/pagination-previous";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Pagination;
const COMPONENT_NAME = "Pagination";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "pagination";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Next: PaginationNext,
    Previous: PaginationPrevious,
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

    describe("align", () => {
      validateOneOfPropType(propTypes, "align", PAGINATION_ALIGNMENTS);

      PAGINATION_ALIGNMENTS.map(align => {
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
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
      validateOneOfPropType(propTypes, "size", PAGINATION_SIZES);

      PAGINATION_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
