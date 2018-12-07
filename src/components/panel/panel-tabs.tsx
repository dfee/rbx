import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { PanelTab } from "./panel-tab";

export type PanelTabsModifierProps = Partial<{ className: string }>;

export type PanelTabsProps = ModifierProps & PanelTabsModifierProps;

export const PanelTabs = Object.assign(
  forwardRefAs<PanelTabsProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = cx("panel-tabs", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { Tab: PanelTab },
);
