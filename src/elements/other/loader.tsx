import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type LoaderModifierProps = Partial<{ className: string }>;

export type LoaderProps = HelpersProps & LoaderModifierProps;

export const Loader = forwardRefAs<LoaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("loader", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
    children: null,
  },
);
