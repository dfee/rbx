import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";

export const ICON_ALIGNMENTS = tuple("left", "right");
export type IconAlignments = (typeof ICON_ALIGNMENTS)[number];

export const ICON_SIZES = tuple("small", "medium", "large");
export type IconSizes = (typeof ICON_SIZES)[number];

export type IconModifierProps = Partial<{
  align: IconAlignments;
  color: Colors;
  size: IconSizes;
}>;

export type IconProps = Prefer<
  HelpersProps & IconModifierProps,
  React.HTMLAttributes<HTMLSpanElement>
>;

const propTypes = {
  ...genericPropTypes,
  align: PropTypes.oneOf(ICON_ALIGNMENTS),
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(ICON_SIZES),
};

export const Icon = Object.assign(
  forwardRefAs<IconProps, "span">(
    (props, ref) => {
      const { align, as, color, size, ...rest } = transformHelpers(props);
      rest.className = classNames("icon", rest.className, {
        [`has-text-${color}`]: color,
        [`is-${align}`]: align,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes },
);
