import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

import { BreadcrumbItem } from "./breadcrumb-item";

export const BREADCRUMB_DEFAULTS = {
  alignments: ["centered", "right"] as const,
  separators: ["arrow", "bullet", "dot", "succeeds"] as const,
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BreadcrumbVariablesOverrides {}

export interface BreadcrumbVariablesDefaults {
  alignments: (typeof BREADCRUMB_DEFAULTS["alignments"])[number];
  separators: (typeof BREADCRUMB_DEFAULTS["separators"])[number];
  sizes: (typeof BREADCRUMB_DEFAULTS["sizes"])[number];
}

export type BreadcrumbVariables = Prefer<
  BreadcrumbVariablesOverrides,
  BreadcrumbVariablesDefaults
>;

export type BreadcrumbModifierProps = {
  align?: BreadcrumbVariables["alignments"];
  separator?: BreadcrumbVariables["separators"];
  size?: BreadcrumbVariables["sizes"];
};

export type BreadcrumbProps = HelpersProps & BreadcrumbModifierProps;

export const Breadcrumb = Object.assign(
  forwardRefAs<BreadcrumbProps>(
    ({ align, children, className, separator, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "breadcrumb",
          {
            [`has-${separator}-separator`]: separator,
            [`is-${align}`]: align,
            [`is-${size}`]: size,
          },
          className,
        )}
        {...rest}
      >
        <ul>{children}</ul>
      </Generic>
    ),
    { as: "nav" },
  ),
  { Item: BreadcrumbItem },
);

Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
