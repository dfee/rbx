import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
  className: string;
}>;

export type PanelBlockProps = ModifierProps & PanelBlockModifierProps;

export const PanelBlock = forwardRefAs<PanelBlockProps, "div">(
  (props, ref) => {
    const { active, as, ...rest } = transformModifiers(props);
    rest.className = classNames("panel-block", rest.className, {
      "is-active": active,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
  },
);
