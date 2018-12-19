import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PaginationListProps = HelpersProps;

export const PaginationList = Object.assign(
  forwardRefAs<PaginationListProps, "ul">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("pagination-list", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "ul" },
  ),
  { propTypes: genericPropTypes },
);
