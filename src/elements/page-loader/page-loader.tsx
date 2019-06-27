import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

export const PAGE_LOADER_DEFAULTS = {
  directions: ["right-to-left", "left-to-right"] as const,
};

export type PageLoaderModifierProps = {
  active?: boolean;
  color?: Variables["colors"];
  direction?: (typeof PAGE_LOADER_DEFAULTS["directions"])[number];
};

export type PageLoaderProps = HelpersProps & PageLoaderModifierProps;

export const PageLoader = Object.assign(
  forwardRefAs<PageLoaderProps>(
    ({ active, className, color, direction, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "pageloader",
          {
            "is-active": active,
            [`is-${color}`]: color,
            [`is-${direction}`]: direction,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    DEFAULTS: PAGE_LOADER_DEFAULTS,
  },
);

PageLoader.displayName = "PageLoader";
PageLoader.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
