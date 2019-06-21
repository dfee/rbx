import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PanelBlockModifierProps = {
  active?: boolean;
};

export type PanelBlockProps = HelpersProps & PanelBlockModifierProps;

export const PanelBlock = forwardRefAs<PanelBlockProps>(
  ({ active, className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("panel-block", { "is-active": active }, className)}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelBlock.displayName = "Panel.Block";
PanelBlock.propTypes = {
  active: PropTypes.bool,
};
