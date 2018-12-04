import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { ContentOrderedList } from "./content-ordered-list";

export const CONTENT_SIZES = tuple("small", "medium", "large");
export type ContentSizes = (typeof CONTENT_SIZES)[number];

export type ContentModifierProps = Partial<{
  size: ContentSizes;
}>;

export type ContentProps = ModifierProps & ContentModifierProps;

export const Content = Object.assign(
  forwardRefAs<ContentProps, "div">((props, ref) => {
    const { as, size, ...rest } = transformModifiers(props);
    rest.className = cx("content", rest.className, {
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  { OrderedList: ContentOrderedList },
);
