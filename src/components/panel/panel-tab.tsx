import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { PanelTabGroup } from "./panel-tab-group";

export type PanelTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabProps = HelpersProps & PanelTabModifierProps;

export const PanelTab = Object.assign(
  forwardRefAs<HTMLAnchorElement, PanelTabProps>(
    ({ active, className, ...rest }, ref) => (
      <Generic
        className={classNames({ "is-active": active }, className)}
        ref={ref}
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
