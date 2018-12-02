import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PanelIconProps = ModifierProps;

export const PanelIcon = forwardRefAs<PanelIconProps, "span">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("panel-icon", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "span");
