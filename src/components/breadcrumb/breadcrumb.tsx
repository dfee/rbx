import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { BreadcrumbItem } from "./breadcrumb-item";

export const BREADCRUMB_ALIGNMENTS = tuple("centered", "right");
export type BreadacrumbAlignments = (typeof BREADCRUMB_ALIGNMENTS)[number];

export const BREADCRUMB_SEPARATORS = tuple(
  "arrow",
  "bullet",
  "dot",
  "succeeds",
);
export type BreadcrumbSeparators = (typeof BREADCRUMB_SEPARATORS)[number];

export const BREADCRUMB_SIZES = tuple("small", "medium", "large");
export type BreadacrumbSizes = (typeof BREADCRUMB_SIZES)[number];

export type BreadcrumbModifierProps = Partial<{
  align: BreadacrumbAlignments;
  separator: BreadcrumbSeparators;
  size: BreadacrumbSizes;
}>;

export type BreadcrumbProps = HelpersProps & BreadcrumbModifierProps;

const propTypes = {
  align: PropTypes.oneOf(BREADCRUMB_ALIGNMENTS),
  separator: PropTypes.oneOf(BREADCRUMB_SEPARATORS),
  size: PropTypes.oneOf(BREADCRUMB_SIZES),
};

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
  {
    Item: BreadcrumbItem,
    propTypes,
  },
);
