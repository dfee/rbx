import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PanelIconModifierProps = Partial<{ className: string }>;

export type PanelIconProps = HelpersProps & PanelIconModifierProps;

export const PanelIcon = forwardRefAs<PanelIconProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("panel-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
