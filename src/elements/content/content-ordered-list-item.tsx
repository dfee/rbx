import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type ContentOrderedListItemProps = HelpersProps;

export const ContentOrderedListItem = forwardRefAs<ContentOrderedListItemProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "li" },
);

ContentOrderedListItem.displayName = "Content.OrderedList.Item";
