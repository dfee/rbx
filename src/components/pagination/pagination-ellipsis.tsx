import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PaginationEllipsisProps = HelpersProps;

export const PaginationEllipsis = Object.assign(
  forwardRefAs<PaginationEllipsisProps, "span">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("pagination-ellipsis", rest.className);
      return <li children={React.createElement(as!, { ref, ...rest })} />;
    },
    {
      as: "span",
      children: "…",
    },
  ),
  { propTypes: genericPropTypes },
);
