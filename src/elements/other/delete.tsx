import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const DELETE_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteVariablesOverrides {}

export interface DeleteVariablesDefaults {
  sizes: (typeof DELETE_DEFAULTS["sizes"])[number];
}

export type DeleteVariables = Prefer<
  DeleteVariablesOverrides,
  DeleteVariablesDefaults
>;

export type DeleteModifierProps = {
  size?: DeleteVariables["sizes"];
};

export type DeleteProps = HelpersProps & DeleteModifierProps;

export const Delete = Object.assign(
  forwardRefAs<DeleteProps>(
    ({ className, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames("delete", { [`is-${size}`]: size }, className)}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  {
    DEFAULTS: DELETE_DEFAULTS,
  },
);

Delete.displayName = "Delete";
Delete.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
