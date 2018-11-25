import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
  children: React.ReactNode;
  className: string;
  style: {};
}>;

export type TagGroupProps = ModifierProps &
  TagGroupModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"span">, "unselectable">>;

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({ children, className, gapless, ...allProps }, ref) => {
    const props = modifiers.clean(allProps);
    return (
      <span
        {...props}
        ref={ref}
        className={cx("tags", modifiers.classNames(allProps), className, {
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

export default TagGroup;
