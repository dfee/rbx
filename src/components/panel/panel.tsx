import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { PanelBlock } from "./panel-block";
import { PanelHeader } from "./panel-header";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelProps = ModifierProps;

export const Panel = Object.assign(
  asExoticComponent<PanelProps, "nav">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("panel", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "nav"),
  {
    Block: PanelBlock,
    Header: PanelHeader,
    Icon: PanelIcon,
    Tabs: PanelTabs,
  },
);
