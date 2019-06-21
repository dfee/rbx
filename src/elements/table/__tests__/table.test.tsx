import React from "react";

import { Table } from "src/elements/table/table";
import { TableBody } from "src/elements/table/table-body";
import { TableCell } from "src/elements/table/table-cell";
import { TableFoot } from "src/elements/table/table-foot";
import { TableHead } from "src/elements/table/table-head";
import { TableHeading } from "src/elements/table/table-heading";
import { TableRow } from "src/elements/table/table-row";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = Table;
const DISPLAY_NAME = "Table";
const DEFAULT_ELEMENT = "table";
const BULMA_CLASS_NAME = "table";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: TableBody,
    Cell: TableCell,
    defaultProps: { as: DEFAULT_ELEMENT },
    Foot: TableFoot,
    Head: TableHead,
    Heading: TableHeading,
    Row: TableRow,
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

    describe("bordered", () => {
      validateBoolPropType(propTypes, "bordered");

      [false, true].forEach(bordered => {
        it(`should ${bordered ? "" : "not "}be bordered`, () => {
          const node = <Table bordered={bordered} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-bordered")).toBe(bordered);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].forEach(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = <Table fullwidth={fullwidth} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("hoverable", () => {
      validateBoolPropType(propTypes, "hoverable");

      [false, true].forEach(hoverable => {
        it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
          const node = <Table hoverable={hoverable} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
        });
      });
    });

    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].forEach(narrow => {
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = <Table narrow={narrow} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });
    });

    describe("striped", () => {
      validateBoolPropType(propTypes, "striped");

      [false, true].forEach(striped => {
        it(`should ${striped ? "" : "not "}be striped`, () => {
          const node = <Table striped={striped} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-striped")).toBe(striped);
        });
      });
    });
  });
});
