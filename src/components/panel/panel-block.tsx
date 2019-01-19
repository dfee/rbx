import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
}>;

export type PanelBlockProps = HelpersProps & PanelBlockModifierProps;

export const PanelBlock = forwardRefAs<HTMLDivElement, PanelBlockProps>(
  ({ active, className, ...rest }, ref) => (
    <Generic
      className={classNames("panel-block", { "is-active": active }, className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelBlock.displayName = "Panel.Block";
PanelBlock.propTypes = {
  active: PropTypes.bool,
};
