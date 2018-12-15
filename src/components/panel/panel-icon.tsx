import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type PanelIconModifierProps = Partial<{ className: string }>;

export type PanelIconProps = ModifierProps & PanelIconModifierProps;

export const PanelIcon = forwardRefAs<PanelIconProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("panel-icon", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
