import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
}>;

export type PanelBlockProps = ModifierProps & PanelBlockModifierProps;

export const PanelBlock = asExoticComponent<PanelBlockProps, "div">(
  (props, ref) => {
    const { active, as, ...rest } = modify(props);
    rest.className = cx("panel-block", rest.className, {
      "is-active": active,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);

PanelBlock.defaultProps = Object.assign(
  { active: false },
  PanelBlock.defaultProps,
);
