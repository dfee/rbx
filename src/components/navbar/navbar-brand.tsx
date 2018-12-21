import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Prefer } from "../../types";

export type NavbarBrandProps = Prefer<
  HelpersProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBrand = Object.assign(
  forwardRefAs<NavbarBrandProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-brand", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
