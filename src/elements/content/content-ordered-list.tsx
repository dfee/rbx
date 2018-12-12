import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { ContentOrderedListItem } from "./content-ordered-list-item";

export const CONTENT_ORDERED_LIST_TYPES = tuple(
  "lower-alpha",
  "lower-roman",
  "upper-alpha",
  "upper-roman",
);
export type ContentOrderedListTypes = (typeof CONTENT_ORDERED_LIST_TYPES)[number];

export type ContentOrderedListModifierProps = Partial<{
  type: ContentOrderedListTypes;
}>;

export type ContentOrderedListProps = Prefer<
  ModifierProps & ContentOrderedListModifierProps,
  Omit<React.HTMLAttributes<HTMLOListElement>, "type">
>;

export const ContentOrderedList = Object.assign(
  forwardRefAs<ContentOrderedListProps, "ol">(
    (props, ref) => {
      const { as, type, ...rest } = transformModifiers(props);
      rest.className = classNames(rest.className, {
        [`is-${type}`]: type,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "ol" },
  ),
  { Item: ContentOrderedListItem },
);
