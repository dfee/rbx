import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const TITLE_DEFAULTS = {
  sizes: tuple(1, 2, 3, 4, 5, 6),
};

export interface TitleVariablesOverrides {}

export interface TitleVariablesDefaults {
  sizes: (typeof TITLE_DEFAULTS["sizes"])[number];
}

export type TitleVariables = Prefer<
  TitleVariablesOverrides,
  TitleVariablesDefaults
>;

export type TitleModifierProps = Partial<{
  size: TitleVariables["sizes"];
  spaced: boolean;
  subtitle: boolean;
}>;

export type TitleProps = HelpersProps & TitleModifierProps;

export const Title = forwardRefAs<TitleProps, "h1">(
  ({ className, size, spaced, subtitle, ...rest }, ref) => (
    <Generic
      className={classNames(
        {
          [`is-${size}`]: size !== undefined,
          "is-spaced": spaced === true && subtitle !== true,
          subtitle,
          title: subtitle !== true,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "h1" },
);

Title.displayName = "Title";
Title.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaced: PropTypes.bool,
  subtitle: PropTypes.bool,
};
