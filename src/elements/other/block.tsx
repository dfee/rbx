import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type BlockModifierProps = Partial<{ className: string }>;

export type BlockProps = HelpersProps & BlockModifierProps;

export const Block = forwardRefAs<BlockProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("block", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
