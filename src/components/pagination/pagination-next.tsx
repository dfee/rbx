import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PaginationNextProps = HelpersProps;

export const PaginationNext = Object.assign(
  forwardRefAs<PaginationNextProps, "a">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("pagination-next", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    {
      as: "a",
      children: "Next page",
    },
  ),
  { propTypes: genericPropTypes },
);
