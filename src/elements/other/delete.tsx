import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const DELETE_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

export interface DeleteVariablesOverrides {}

export interface DeleteVariablesDefaults {
  sizes: (typeof DELETE_DEFAULTS["sizes"])[number];
}

export type DeleteVariables = Prefer<
  DeleteVariablesOverrides,
  DeleteVariablesDefaults
>;

export type DeleteModifierProps = Partial<{
  size: DeleteVariables["sizes"];
}>;

export type DeleteProps = HelpersProps & DeleteModifierProps;

export const Delete = forwardRefAs<DeleteProps>(
  ({ className, size, ...rest }, ref) => (
    <Generic
      className={classNames("delete", { [`is-${size}`]: size }, className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "a" },
);

Delete.displayName = "Delete";
Delete.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
