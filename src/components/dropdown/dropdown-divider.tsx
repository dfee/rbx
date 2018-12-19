import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type DropdownDividerProps = HelpersProps;

export const DropdownDivider = Object.assign(
  forwardRefAs<DropdownDividerProps, "hr">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("dropdown-divider", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "hr" },
  ),
  { propTypes: genericPropTypes },
);
