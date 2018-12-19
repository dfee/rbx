import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type ContentOrderedListItemProps = HelpersProps;

export const ContentOrderedListItem = Object.assign(
  forwardRefAs<ContentOrderedListItemProps, "li">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "li" },
  ),
  { propTypes: genericPropTypes },
);
