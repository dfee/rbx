import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";

export const TITLE_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TitleSizes = (typeof TITLE_SIZES)[number];

export type TitleModifierProps = Partial<{
  size: TitleSizes;
  spaced: boolean;
  subtitle: boolean;
}>;

export type TitleProps = HelpersProps & TitleModifierProps;

const propTypes = {
  size: PropTypes.oneOf(TITLE_SIZES),
  spaced: PropTypes.bool,
  subtitle: PropTypes.bool,
};

export const Title = Object.assign(
  forwardRefAs<TitleProps, "h1">(
    ({ className, size, spaced, subtitle, ...rest }, ref) => (
      <Generic
        className={classNames(
          {
            [`is-${size}`]: !!size,
            "is-spaced": spaced && !subtitle,
            subtitle,
            title: !subtitle,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "h1" },
  ),
  { propTypes },
);
