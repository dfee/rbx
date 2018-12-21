import Enzyme from "enzyme";
import React from "react";

import { Table } from "../table";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "../../../__tests__/testing";

describe("Table component", () => {
  hasProperties(Table, {
    defaultProps: { as: "table" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Table />);
    expect(wrapper.is("table")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Table as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLTableElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Table ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".table").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Table />);
    expect(wrapper.hasClass("table")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Table className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(bordered =>
    it(`should ${bordered ? "" : "not "}be bordered`, () => {
      const wrapper = Enzyme.shallow(<Table bordered={bordered} />);
      expect(wrapper.hasClass("is-bordered")).toBe(bordered);
    }),
  );

  [false, true].map(fullwidth =>
    it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
      const wrapper = Enzyme.shallow(<Table fullwidth={fullwidth} />);
      expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
    }),
  );

  [false, true].map(hoverable =>
    it(`should ${hoverable ? "" : "not "}be hoverable`, () => {
      const wrapper = Enzyme.shallow(<Table hoverable={hoverable} />);
      expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
    }),
  );

  [false, true].map(narrow =>
    it(`should ${narrow ? "" : "not "}be narrow`, () => {
      const wrapper = Enzyme.shallow(<Table narrow={narrow} />);
      expect(wrapper.hasClass("is-narrow")).toBe(narrow);
    }),
  );

  [false, true].map(striped =>
    it(`should ${striped ? "" : "not "}be striped`, () => {
      const wrapper = Enzyme.shallow(<Table striped={striped} />);
      expect(wrapper.hasClass("is-striped")).toBe(striped);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Table;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "bordered");
    validateBoolPropType(propTypes, "fullwidth");
    validateBoolPropType(propTypes, "hoverable");
    validateBoolPropType(propTypes, "narrow");
    validateBoolPropType(propTypes, "striped");
  });
});
