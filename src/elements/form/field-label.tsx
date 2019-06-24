import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const FIELD_LABEL_DEFAULTS = {
  sizes: ["small", "normal", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FieldLabelVariablesOverrides {}

export interface FieldLabelVariablesDefaults {
  sizes: (typeof FIELD_LABEL_DEFAULTS["sizes"])[number];
}

export type FieldLabelVariables = Prefer<
  FieldLabelVariablesOverrides,
  FieldLabelVariablesDefaults
>;

export type FieldLabelModifierProps = {
  size?: FieldLabelVariables["sizes"];
};

export type FieldLabelProps = HelpersProps & FieldLabelModifierProps;

export const FieldLabel = Object.assign(
  forwardRefAs<FieldLabelProps>(
    ({ className, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "field-label",
          { [`is-${size}`]: size },
          className,
        )}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    DEFAULTS: FIELD_LABEL_DEFAULTS,
  },
);

FieldLabel.displayName = "Field.Label";
FieldLabel.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
