import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

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
  ModifierProps & IconModifierProps,
  React.HTMLAttributes<HTMLSpanElement>
>;

export const Icon = forwardRefAs<IconProps, "span">(
  (props, ref) => {
    const { align, as, color, size, ...rest } = transformModifiers(props);
    rest.className = cx("icon", rest.className, {
      [`has-text-${color}`]: color,
      [`is-${align}`]: align,
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
