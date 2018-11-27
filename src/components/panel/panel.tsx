import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { PanelBlock } from "./panel-block";
import { PanelHeader } from "./panel-header";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelProps = ModifierProps;

export const Panel = Object.assign(
  renderAsExoticComponent<PanelProps, "nav">(
    ({ className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("panel", className)} />
    ),
    "nav",
  ),
  {
    Block: PanelBlock,
    Header: PanelHeader,
    Icon: PanelIcon,
    Tabs: PanelTabs,
  },
);
