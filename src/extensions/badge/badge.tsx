import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { tuple } from "../../utils";

export const BADGE_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
};

export type BadgeModifierProps = Partial<{
  badgeColor: Variables["colors"];
  badgeContent: number | string;
  badgeOutlined: boolean;
  badgeRounded: boolean;
  badgeSize: (typeof BADGE_DEFAULTS["sizes"])[number];
}>;

export type BadgeProps = HelpersProps & BadgeModifierProps;

export const Badge = forwardRefAs<BadgeProps>(
  (
    {
      className,
      badgeColor,
      badgeContent,
      badgeOutlined,
      badgeRounded,
      badgeSize,
      ...rest
    },
    ref,
  ) => (
    <Generic
      className={classNames(
        "badge",
        {
          [`has-badge-${badgeColor}`]: badgeColor,
          "has-badge-outlined": badgeOutlined,
          "has-badge-rounded": badgeRounded,
          [`has-badge-${badgeSize}`]: badgeSize,
        },
        className,
      )}
      data-badge={badgeContent}
      ref={ref}
      {...rest}
    />
  ),
  {
    as: "span",
    badgeContent: "",
  },
);

Badge.displayName = "Badge";
Badge.propTypes = {
  badgeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeOutlined: PropTypes.bool,
  badgeSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
