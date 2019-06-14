import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const FIELD_LABEL_DEFAULTS = {
  sizes: ["small", "normal", "medium", "large"] as const,
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

export const FieldLabel = forwardRefAs<FieldLabelProps>(
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
