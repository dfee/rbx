import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const TITLE_DEFAULTS = {
  sizes: [1, 2, 3, 4, 5, 6] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TitleVariablesOverrides {}

export interface TitleVariablesDefaults {
  sizes: (typeof TITLE_DEFAULTS["sizes"])[number];
}

export type TitleVariables = Prefer<
  TitleVariablesOverrides,
  TitleVariablesDefaults
>;

export type TitleModifierProps = {
  size?: TitleVariables["sizes"];
  spaced?: boolean;
  subtitle?: boolean;
};

export type TitleProps = HelpersProps & TitleModifierProps;

export const Title = Object.assign(
  forwardRefAs<TitleProps>(
    ({ className, size, spaced, subtitle, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          {
            [`is-${size}`]: size !== undefined,
            "is-spaced": spaced === true && subtitle !== true,
            subtitle,
            title: subtitle !== true,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "h1" },
  ),
  {
    DEFAULTS: TITLE_DEFAULTS,
  },
);

Title.displayName = "Title";
Title.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaced: PropTypes.bool,
  subtitle: PropTypes.bool,
};
