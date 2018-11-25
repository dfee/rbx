import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";

export type LabelModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  htmlFor: string;
  size: "small" | "medium" | "large";
  style: {};
}>;

export type LabelProps = ModifierProps &
  LabelModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"label">, "unselectable">>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, size, ...allProps }, ref) => {
    const props = modifiers.clean(allProps);
    return (
      <label
        {...props}
        ref={ref}
        className={cx("label", modifiers.classNames(allProps), className, {
          [`is-${size}`]: size,
        })}
      >
        {children}
      </label>
    );
  },
);
Label.defaultProps = {
  children: null,
};

export default Label;
