import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import { TagGroup } from "./tag-group";

export type TagModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  remove: boolean;
  rounded: boolean;
  size: "medium" | "large";
  style: React.CSSProperties;
}>;

export type TagProps = ModifierProps & TagModifierProps;

export const Tag = Object.assign(
  renderAsExoticComponent<TagProps, "span">(
    ({ children, className, color, size, rounded, remove, ...props }, ref) => (
      <Element
        {...props}
        ref={ref}
        className={cx("tag", className, {
          [`is-${size}`]: size,
          [`is-${color}`]: color,
          "is-delete": remove,
          "is-rounded": rounded,
        })}
      >
        {!remove && children}
      </Element>
    ),
    "span",
  ),
  { Group: TagGroup },
);
Tag.defaultProps = Object.assign(
  {
    children: null,
    remove: false,
    rounded: false,
  },
  Tag.defaultProps,
);
