import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

export const ICON_SIZES = tuple("small", "medium", "large");
export type IconSizes = (typeof ICON_SIZES)[number];

export type IconModifierProps = Partial<{
  color: Colors;
  icon: string;
  size: IconSizes;
}>;

export type IconProps = Prefer<
  ModifierProps & IconModifierProps,
  React.HTMLAttributes<HTMLSpanElement>
>;

export const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { children, color, icon, size, ...rest } = transformModifiers(props);
  rest.className = cx("icon", rest.className, {
    [`is-${size}`]: size,
    [`has-text-${color}`]: color,
  });
  return (
    <span {...rest}>
      {children || (
        <i ref={ref} className={cx("rbx", { [`rbx-${icon}`]: icon })} />
      )}
    </span>
  );
});
Icon.defaultProps = {
  children: null,
};
