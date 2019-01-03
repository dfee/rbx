import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { PanelTab } from "./panel-tab";

export type PanelTabsProps = HelpersProps;

export const PanelTabs = Object.assign(
  forwardRefAs<PanelTabsProps, "div">(
    ({ className, ...rest }, ref) => (
      <Generic
        className={classNames("panel-tabs", className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  { Tab: PanelTab },
);
