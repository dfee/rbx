import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps } from "../../modifiers";

export type BlockModifierProps = Partial<{ className: string }>;

export type BlockProps = ModifierProps & BlockModifierProps;

export const Block = forwardRefAs<BlockProps, "div">(
  (props, ref) => {
    const { as, ...rest } = props;
    rest.className = classNames("block", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
