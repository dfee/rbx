import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PanelIconProps = ModifierProps;

export const PanelIcon = asExoticComponent<PanelIconProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("panel-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "span",
);
