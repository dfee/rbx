import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";
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
  asExoticComponent<TagProps, "span">((props, ref) => {
    const { as, children, color, remove, rounded, size, ...rest } = modify(
      props,
    );
    rest.className = cx("tag", rest.className, {
      [`is-${size}`]: size,
      [`is-${color}`]: color,
      "is-delete": remove,
      "is-rounded": rounded,
    });
    return React.createElement(as!, {
      children: !remove && children,
      ref,
      ...rest,
    });
  }, "span"),
  { Group: TagGroup },
);

Tag.defaultProps = Object.assign(
  {
    remove: false,
    rounded: false,
  },
  Tag.defaultProps,
);
