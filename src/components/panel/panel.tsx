import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import PanelBlock from "./PanelBlock";
import PanelHeader from "./PanelHeader";
import PanelIcon from "./PanelIcon";
import PanelTabs from "./PanelTabs";

export type PanelProps = ModifierProps;

type Panel = RenderAsExoticComponent<PanelProps, "nav"> & {
  Block: typeof PanelBlock;
  Header: typeof PanelHeader;
  Icon: typeof PanelIcon;
  Tabs: typeof PanelTabs;
};

const Panel: Partial<Panel> = renderAsExoticComponent<PanelProps, "nav">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel", className)} />
  ),
  "nav",
);

Panel.Block = PanelBlock;
Panel.Header = PanelHeader;
Panel.Icon = PanelIcon;
Panel.Tabs = PanelTabs;

export default Panel as Panel;
