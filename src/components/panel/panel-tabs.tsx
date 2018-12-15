import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { PanelTab } from "./panel-tab";

export type PanelTabsModifierProps = Partial<{ className: string }>;

export type PanelTabsProps = HelpersProps & PanelTabsModifierProps;

export const PanelTabs = Object.assign(
  forwardRefAs<PanelTabsProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("panel-tabs", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { Tab: PanelTab },
);
