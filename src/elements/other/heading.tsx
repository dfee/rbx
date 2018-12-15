import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type HeadingModifierProps = Partial<{ className: string }>;
export type HeadingProps = HelpersProps & HeadingModifierProps;

export const Heading = forwardRefAs<HeadingProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("heading", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
