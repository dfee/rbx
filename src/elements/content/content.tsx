import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { ContentOrderedList } from "./content-ordered-list";

export const CONTENT_SIZES = tuple("small", "medium", "large");
export type ContentSizes = (typeof CONTENT_SIZES)[number];

export type ContentModifierProps = Partial<{
  className: string;
  size: ContentSizes;
}>;

export type ContentProps = ModifierProps & ContentModifierProps;

export const Content = Object.assign(
  forwardRefAs<ContentProps, "div">(
    (props, ref) => {
      const { as, size, ...rest } = transformModifiers(props);
      rest.className = classNames("content", rest.className, {
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { OrderedList: ContentOrderedList },
);
