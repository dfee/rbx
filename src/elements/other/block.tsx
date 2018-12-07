import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps } from "@/modifiers";

export type BlockProps = ModifierProps;

export const Block = forwardRefAs<BlockProps, "div">((props, ref) => {
  const { as, ...rest } = props;
  rest.className = cx("block", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
