import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type ContentOrderedListItemProps = HelpersProps;

export const ContentOrderedListItem = forwardRefAs<
  ContentOrderedListItemProps,
  "li"
>((props, ref) => <Generic ref={ref} {...props} />, { as: "li" });
