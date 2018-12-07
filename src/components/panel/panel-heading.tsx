import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PanelHeadingProps = ModifierProps;

export const PanelHeading = forwardRefAs<PanelHeadingProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("panel-heading", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
