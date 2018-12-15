import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
  className: string;
}>;

export type PanelBlockProps = HelpersProps & PanelBlockModifierProps;

export const PanelBlock = forwardRefAs<PanelBlockProps, "div">(
  (props, ref) => {
    const { active, as, ...rest } = transformHelpers(props);
    rest.className = classNames("panel-block", rest.className, {
      "is-active": active,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
  },
);
