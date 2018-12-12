import Enzyme from "enzyme";
import React from "react";

import { Field, FIELD_ALIGNMENTS, FIELD_KINDS } from "../field";
import { FieldBody } from "../field-body";
import { FieldLabel } from "../field-label";

import { hasProperties } from "@/__tests__/helpers";

describe("Field component", () => {
  hasProperties(Field, {
    Body: FieldBody,
    Label: FieldLabel,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Field />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Field as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Field ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".field").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Field />);
    expect(wrapper.hasClass("field")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Field className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  FIELD_KINDS.map(kind =>
    FIELD_ALIGNMENTS.map(align =>
      it(`should be aligned ${kind}-${align}`, () => {
        const wrapper = Enzyme.shallow(<Field align={align} kind={kind} />);
        expect(
          wrapper.hasClass(
            kind === "addons" ? `has-addons-${align}` : `is-grouped-${align}`,
          ),
        ).toBe(true);
      }),
    ),
  );

  FIELD_KINDS.map(kind =>
    it(`should be ${kind}`, () => {
      const wrapper = Enzyme.shallow(<Field kind={kind} />);
      expect(
        wrapper.hasClass(kind === "addons" ? "has-addons" : "is-grouped"),
      ).toBe(true);
    }),
  );

  FIELD_KINDS.map(kind =>
    [false, true].map(multiline =>
      it(`should ${
        kind === "group" && multiline ? "" : "not "
      }be multiline when ${kind} and ${
        multiline ? "" : "not "
      }multiline `, () => {
        const wrapper = Enzyme.shallow(
          <Field multiline={multiline} kind={kind} />,
        );
        expect(wrapper.hasClass("is-grouped-multiline")).toBe(
          kind === "group" && multiline,
        );
      }),
    ),
  );

  [false, true].map(expanded =>
    it(`should ${expanded ? "" : "not "}be expanded`, () => {
      const wrapper = Enzyme.shallow(<Field expanded={expanded} />);
      expect(wrapper.hasClass("is-expanded")).toBe(expanded);
    }),
  );

  [false, true].map(horizontal =>
    it(`should ${horizontal ? "" : "not "}be horizontal`, () => {
      const wrapper = Enzyme.shallow(<Field horizontal={horizontal} />);
      expect(wrapper.hasClass("is-horizontal")).toBe(horizontal);
    }),
  );

  [false, true].map(narrow =>
    it(`should ${narrow ? "" : "not "}be narrow`, () => {
      const wrapper = Enzyme.shallow(<Field narrow={narrow} />);
      expect(wrapper.hasClass("is-narrow")).toBe(narrow);
    }),
  );
});
