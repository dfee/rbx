import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { FieldBody } from "./field-body";
import { FieldLabel } from "./field-label";

export const FIELD_DEFAULTS = {
  alignments: tuple("centered", "right"),
  kinds: tuple("addons", "group"),
};

export interface FieldVariablesOverrides {}

export interface FieldVariablesDefaults {
  alignments: (typeof FIELD_DEFAULTS["alignments"])[number];
  kinds: (typeof FIELD_DEFAULTS["kinds"])[number];
}

export type FieldVariables = Prefer<
  FieldVariablesOverrides,
  FieldVariablesDefaults
>;

export type FieldModifierProps = Partial<{
  align: FieldVariables["alignments"];
  expanded: boolean;
  horizontal: boolean;
  kind: FieldVariables["kinds"];
  multiline: boolean;
  narrow: boolean;
}>;

export type FieldProps = HelpersProps & FieldModifierProps;

export const Field = Object.assign(
  forwardRefAs<FieldProps, "div">(
    (props, ref) => {
      const {
        align,
        expanded,
        horizontal,
        kind,
        multiline,
        narrow,
        ...rest
      } = props;

      let k: string | undefined;
      if (kind === "addons") {
        k = "has-addons";
      } else if (kind === "group") {
        k = "is-grouped";
      }

      rest.className = classNames(
        "field",
        {
          [`${k}`]: k,
          [`${k}-${align}`]: k !== undefined && align !== undefined,
          [`${k}-multiline`]: k === "is-grouped" && multiline === true,
          "is-expanded": expanded,
          "is-horizontal": horizontal,
          "is-narrow": narrow,
        },
        rest.className,
      );

      return <Generic ref={ref} {...rest} />;
    },
    { as: "div" },
  ),
  {
    Body: FieldBody,
    Label: FieldLabel,
  },
);

Field.displayName = "Field";
Field.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expanded: PropTypes.bool,
  horizontal: PropTypes.bool,
  kind: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  multiline: PropTypes.bool,
  narrow: PropTypes.bool,
};
