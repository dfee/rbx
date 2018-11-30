import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type PanelHeaderProps = ModifierProps;

export const PanelHeader = asExoticComponent<PanelHeaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("panel-heading", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
