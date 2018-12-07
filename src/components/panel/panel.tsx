import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { PanelBlock } from "./panel-block";
import { PanelHeading } from "./panel-heading";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelProps = ModifierProps;

export const Panel = Object.assign(
  forwardRefAs<PanelProps, "nav">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("panel", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "nav"),
  {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tabs: PanelTabs,
  },
);
