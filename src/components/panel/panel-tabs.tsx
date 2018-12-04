import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { PanelTab } from "./panel-tab";

export type PanelTabsProps = ModifierProps;

export const PanelTabs = Object.assign(
  forwardRefAs<PanelTabsProps, "div">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("panel-tabs", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  { Tab: PanelTab },
);
