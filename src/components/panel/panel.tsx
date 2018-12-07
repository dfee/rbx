import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { PanelBlock } from "./panel-block";
import { PanelHeading } from "./panel-heading";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelModifierProps = Partial<{ className: string }>;

export type PanelProps = ModifierProps & PanelModifierProps;

export const Panel = Object.assign(
  forwardRefAs<PanelProps, "nav">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = cx("panel", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "nav" },
  ),
  {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tabs: PanelTabs,
  },
);
