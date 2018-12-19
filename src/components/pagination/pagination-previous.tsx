import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PaginationPreviousProps = HelpersProps;

export const PaginationPrevious = Object.assign(
  forwardRefAs<PaginationPreviousProps, "a">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("pagination-previous", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    {
      as: "a",
      children: "Previous",
    },
  ),
  { propTypes: genericPropTypes },
);
