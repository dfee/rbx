import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ContentOrderedListItemModifierProps = Partial<{
  className: string;
}>;

export type ContentOrderedListItemProps = HelpersProps &
  ContentOrderedListItemModifierProps;

export const ContentOrderedListItem = forwardRefAs<
  ContentOrderedListItemProps,
  "li"
>(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "li" },
);
