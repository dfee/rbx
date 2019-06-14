import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

export const PAGE_LOADER_DEFAULTS = {
  directions: ["right-to-left", "left-to-right"] as const,
};

export type PageLoaderModifierProps = Partial<{
  active: boolean;
  color: Variables["colors"];
  direction: (typeof PAGE_LOADER_DEFAULTS["directions"])[number];
}>;

export type PageLoaderProps = HelpersProps & PageLoaderModifierProps;

export const PageLoader = forwardRefAs<PageLoaderProps>(
  ({ active, className, color, direction, ...rest }, ref) => (
    <Generic
      className={classNames(
        "pageloader",
        {
          "is-active": active,
          [`is-${color}`]: color,
          [`is-${direction}`]: direction,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

PageLoader.displayName = "PageLoader";
PageLoader.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
