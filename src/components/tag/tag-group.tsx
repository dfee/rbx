import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "@/modifiers";

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type TagGroupProps = ModifierProps &
  TagGroupModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"span">, "unselectable">>;

export const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({ children, className, gapless, ...allProps }, ref) => {
    const props = clean(allProps);
    return (
      <span
        {...props}
        ref={ref}
        className={cx("tags", classNames(allProps), className, {
          "has-addons": gapless,
        })}
      >
        {children}
      </span>
    );
  },
);
TagGroup.defaultProps = {
  gapless: false,
};
