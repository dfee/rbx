import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";
import { tuple } from "../../utils";

export const ICON_ALIGNMENTS = tuple("left", "right");
export type IconAlignments = (typeof ICON_ALIGNMENTS)[number];

export const ICON_SIZES = tuple("small", "medium", "large");
export type IconSizes = (typeof ICON_SIZES)[number];

export type IconModifierProps = Partial<{
  align: IconAlignments;
  className: string;
  color: Colors;
  size: IconSizes;
}>;

export type IconProps = Prefer<
  HelpersProps & IconModifierProps,
  React.HTMLAttributes<HTMLSpanElement>
>;

export const Icon = forwardRefAs<IconProps, "span">(
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
);
