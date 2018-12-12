import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ContentOrderedListItemModifierProps = Partial<{
  className: string;
}>;

export type ContentOrderedListItemProps = ModifierProps &
  ContentOrderedListItemModifierProps;

export const ContentOrderedListItem = forwardRefAs<
  ContentOrderedListItemProps,
  "li"
>(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "li" },
);
