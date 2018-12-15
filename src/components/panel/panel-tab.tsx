import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PanelTabModifierProps = Partial<{
  active: boolean;
  className: string;
}>;

export type PanelTabProps = HelpersProps & PanelTabModifierProps;

export const PanelTab = forwardRefAs<PanelTabProps, "a">(
  (props, ref) => {
    const { active, as, className: cn, ...rest } = transformHelpers(props);
    const className = classNames(cn, { "is-active": active }) || undefined;
    return React.createElement(as!, { className, ref, ...rest });
  },
  { as: "a" },
);
