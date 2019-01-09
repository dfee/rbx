import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const DELETE_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
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

const propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Delete = Object.assign(
  forwardRefAs<DeleteProps, "a">(
    ({ className, size, ...rest }, ref) => (
      <Generic
        className={classNames("delete", { [`is-${size}`]: size }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  { propTypes },
);
