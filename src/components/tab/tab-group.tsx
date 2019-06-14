import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const TAB_GROUP_DEFAULTS = {
  alignments: ["centered", "right"] as const,
  sizes: ["small", "medium", "large"] as const,
  kinds: ["boxed", "toggle", "toggle-rounded"] as const,
};

export interface TabGroupVariablesOverrides {}

export interface TabGroupVariablesDefaults {
  alignments: (typeof TAB_GROUP_DEFAULTS["alignments"])[number];
  sizes: (typeof TAB_GROUP_DEFAULTS["sizes"])[number];
  kinds: (typeof TAB_GROUP_DEFAULTS["kinds"])[number];
}

export type TabGroupVariables = Prefer<
  TabGroupVariablesOverrides,
  TabGroupVariablesDefaults
>;

export type TabGroupModifierProps = {
  align?: TabGroupVariables["alignments"];
  fullwidth?: boolean;
  /** This is called style on Bulma documentation */
  kind?: TabGroupVariables["kinds"];
  size?: TabGroupVariables["sizes"];
};

export type TabGroupProps = HelpersProps & TabGroupModifierProps;

export const TabGroup = forwardRefAs<TabGroupProps>(
  ({ align, children, className, fullwidth, kind, size, ...rest }, ref) => (
    <Generic
      className={classNames(
        "tabs",
        {
          [`is-${align}`]: align,
          [`is-${size}`]: size,
          "is-fullwidth": fullwidth,
          [`is-${kind}`]: kind,
          "is-toggle": kind === "toggle" || kind === "toggle-rounded",
          "is-toggle-rounded": kind === "toggle-rounded",
        },
        className,
      )}
      children={<ul>{children}</ul>}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

TabGroup.displayName = "Tab.Group";
TabGroup.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  kind: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
