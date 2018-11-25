import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import PanelBlock from "./components/block";
import PanelHeader from "./components/header";
import PanelIcon from "./components/icon";
import PanelTabs from "./components/tabs";

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
