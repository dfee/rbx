import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const TAB_GROUP_DEFAULTS = {
  alignments: tuple("centered", "right"),
  sizes: tuple("small", "medium", "large"),
  types: tuple("boxed", "toggle", "toggle-rounded"),
};

export interface TabGroupVariablesOverrides {}

export interface TabGroupVariablesDefaults {
  alignments: (typeof TAB_GROUP_DEFAULTS["alignments"])[number];
  sizes: (typeof TAB_GROUP_DEFAULTS["sizes"])[number];
  types: (typeof TAB_GROUP_DEFAULTS["types"])[number];
}

export type TabGroupVariables = Prefer<
  TabGroupVariablesOverrides,
  TabGroupVariablesDefaults
>;

export type TabGroupModifierProps = Partial<{
  align: TabGroupVariables["alignments"];
  fullwidth: boolean;
  size: TabGroupVariables["sizes"];
  /** * This is called style on Bulma documentation */
  type: TabGroupVariables["types"]; // tslint:disable-line:no-reserved-keywords
}>;

export type TabGroupProps = HelpersProps & TabGroupModifierProps;

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const TabGroup = Object.assign(
  forwardRefAs<TabGroupProps, "div">(
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
  { propTypes },
);
