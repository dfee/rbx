import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type PanelHeaderProps = ModifierProps;

const PanelHeader = renderAsExoticComponent<PanelHeaderProps, "div">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel-heading", className)} />
  ),
  "div",
);

export default PanelHeader;
