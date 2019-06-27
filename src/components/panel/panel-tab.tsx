import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { PanelTabGroup } from "./panel-tab-group";

export type PanelTabModifierProps = {
  active?: boolean;
};

export type PanelTabProps = HelpersProps & PanelTabModifierProps;

export const PanelTab = Object.assign(
  forwardRefAs<PanelTabProps>(
    ({ active, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames({ "is-active": active }, className)}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  { Group: PanelTabGroup },
);

PanelTab.displayName = "Panel.Tab";
PanelTab.propTypes = {
  active: PropTypes.bool,
};
