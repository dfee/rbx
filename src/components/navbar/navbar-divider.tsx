import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Prefer } from "../../types";

export type NavbarDividerProps = Prefer<
  HelpersProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarDivider = Object.assign(
  forwardRefAs<NavbarDividerProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-divider", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
