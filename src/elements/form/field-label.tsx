import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const FIELD_LABEL_DEFAULTS = {
  sizes: tuple("small", "normal", "medium", "large"),
};

export interface FieldLabelVariablesOverrides {}

export interface FieldLabelVariablesDefaults {
  sizes: (typeof FIELD_LABEL_DEFAULTS["sizes"])[number];
}

export type FieldLabelVariables = Prefer<
  FieldLabelVariablesOverrides,
  FieldLabelVariablesDefaults
>;

export type FieldLabelModifierProps = Partial<{
  size: FieldLabelVariables["sizes"];
}>;

export type FieldLabelProps = HelpersProps & FieldLabelModifierProps;

export const FieldLabel = forwardRefAs<HTMLDivElement, FieldLabelProps>(
  ({ className, size, ...rest }, ref) => (
    <Generic
      className={classNames("field-label", { [`is-${size}`]: size }, className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

FieldLabel.displayName = "Field.Label";
FieldLabel.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
