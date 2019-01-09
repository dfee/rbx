import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { tuple } from "../../utils";

export const ICON_ALIGNMENTS = tuple("left", "right");
export type IconAlignments = (typeof ICON_ALIGNMENTS)[number];

export const ICON_SIZES = tuple("small", "medium", "large");
export type IconSizes = (typeof ICON_SIZES)[number];

export type IconModifierProps = Partial<{
  align: IconAlignments;
  color: Variables["Colors"];
  size: IconSizes;
}>;

export type IconProps = HelpersProps & IconModifierProps;

const propTypes = {
  align: PropTypes.oneOf(ICON_ALIGNMENTS),
  color: PropTypes.oneOf(DEFAULTS.colors),
  size: PropTypes.oneOf(ICON_SIZES),
};

export const Icon = Object.assign(
  forwardRefAs<IconProps, "span">(
    ({ align, className, color, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "icon",
          {
            [`has-text-${color}`]: color,
            [`is-${align}`]: align,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "span" },
  ),
  { propTypes },
);
