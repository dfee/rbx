import { cx } from "emotion";
import React from "react";

import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type IconModifierProps = Partial<{
  align: "left" | "right";
  color: Colors;
  icon: string;
  size: "small" | "medium" | "large" | "auto";
}> &
  Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "unselectable">;

export type IconProps = ModifierProps & IconModifierProps;

export const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { align, children, color, icon, size, ...rest } = modify(props);
  rest.className = cx("icon", rest.className, {
    [`is-${size}`]: size,
    [`is-${align}`]: align,
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
