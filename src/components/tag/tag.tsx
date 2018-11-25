import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import TagGroup from "./components/tag-group";

export type TagModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  remove: boolean;
  rounded: boolean;
  size: "medium" | "large";
  style: {};
}>;

export type TagProps = ModifierProps & TagModifierProps;

type Tag = RenderAsExoticComponent<TagProps, "span"> & {
  Group: typeof TagGroup;
};

const Tag: Partial<Tag> = renderAsExoticComponent<TagProps, "span">(
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
);
Tag.defaultProps = Object.assign(
  {
    children: null,
    remove: false,
    rounded: false,
  },
  Tag.defaultProps,
);

Tag.Group = TagGroup;

export default Tag as Tag;
