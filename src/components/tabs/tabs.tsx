import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { Tab } from "./tab";

export const TABS_DEFAULTS = {
  alignments: tuple("centered", "right"),
  sizes: tuple("small", "medium", "large"),
  types: tuple("boxed", "toggle", "toggle-rounded"),
};

export interface TabsVariablesOverrides {}

export interface TabsVariablesDefaults {
  alignments: (typeof TABS_DEFAULTS["alignments"])[number];
  sizes: (typeof TABS_DEFAULTS["sizes"])[number];
  types: (typeof TABS_DEFAULTS["types"])[number];
}

export type TabsVariables = Prefer<
  TabsVariablesOverrides,
  TabsVariablesDefaults
>;

export type TabsModifierProps = Partial<{
  align: TabsVariables["alignments"];
  fullwidth: boolean;
  size: TabsVariables["sizes"];
  /** * This is called style on Bulma documentation */
  type: TabsVariables["types"]; // tslint:disable-line:no-reserved-keywords
}>;

export type TabsProps = HelpersProps & TabsModifierProps;

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Tabs = Object.assign(
  forwardRefAs<TabsProps, "div">(
    ({ align, children, className, fullwidth, size, type, ...rest }, ref) => (
      <Generic
        className={classNames(
          "tabs",
          {
            [`is-${align}`]: align,
            [`is-${size}`]: size,
            "is-fullwidth": fullwidth,
            "is-toggle": type === "toggle" || type === "toggle-rounded",
            "is-toggle-rounded": type === "toggle-rounded",
            [`is-${type}`]: type,
          },
          className,
        )}
        children={<ul>{children}</ul>}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    Tab,
    propTypes,
  },
);
