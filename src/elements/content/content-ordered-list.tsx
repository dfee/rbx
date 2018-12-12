import { cx } from "emotion";
import React from "react";

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
  React.forwardRef<HTMLOListElement, ContentOrderedListProps>((props, ref) => {
    const { type, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, {
      [`is-${type}`]: type,
    });
    return React.createElement("ol", { ref, ...rest });
  }),
  { Item: ContentOrderedListItem },
);
