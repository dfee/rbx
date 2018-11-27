import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

export type IconModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
  icon: string;
  size: "small" | "medium" | "large" | "auto";
  align: "left" | "right";
  color: Colors;
}>;

export type IconProps = ModifierProps & IconModifierProps;

export const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ icon, size, color, className, align, children, ...allProps }, ref) => {
    const props = clean(allProps);
    return (
      <span
        {...props}
        className={cx("icon", classNames(allProps), className, {
          [`is-${size}`]: size,
          [`is-${align}`]: align,
          [`has-text-${color}`]: color,
        })}
      >
        {children || (
          <i
            ref={ref}
            className={cx("rbc", {
              [`rbc-${icon}`]: icon,
            })}
          />
        )}
      </span>
    );
  },
);
Icon.defaultProps = {
  children: null,
};
