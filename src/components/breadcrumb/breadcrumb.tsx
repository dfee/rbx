import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { BreadcrumbItem } from "./breadcrumb-item";

export const BREADCRUMB_DEFAULTS = {
  alignments: tuple("centered", "right"),
  separators: tuple("arrow", "bullet", "dot", "succeeds"),
  sizes: tuple("small", "medium", "large"),
};

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

export type BreadcrumbModifierProps = Partial<{
  align: BreadcrumbVariables["alignments"];
  separator: BreadcrumbVariables["separators"];
  size: BreadcrumbVariables["sizes"];
}>;

export type BreadcrumbProps = HelpersProps & BreadcrumbModifierProps;

export const Breadcrumb = Object.assign(
  forwardRefAs<BreadcrumbProps, "nav">(
    ({ align, children, className, separator, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "breadcrumb",
          {
            [`has-${separator}-separator`]: separator,
            [`is-${align}`]: align,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
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
