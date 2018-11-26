import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import PanelTabsTab from "./PanelTabsTab";

export type PanelTabsProps = ModifierProps;

type PanelTabs = RenderAsExoticComponent<PanelTabsProps, "div"> & {
  Tab: typeof PanelTabsTab;
};

const PanelTabs: Partial<PanelTabs> = renderAsExoticComponent<
  PanelTabsProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel-tabs", className)} />
  ),
  "div",
);

PanelTabs.Tab = PanelTabsTab;

export default PanelTabs as PanelTabs;
