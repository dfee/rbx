import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
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

export type BreadcrumbProps = Prefer<
  HelpersProps & BreadcrumbModifierProps,
  React.HTMLAttributes<HTMLElement>
>;

const propTypes = {
  ...genericPropTypes,
  align: PropTypes.oneOf(BREADCRUMB_ALIGNMENTS),
  separator: PropTypes.oneOf(BREADCRUMB_SEPARATORS),
  size: PropTypes.oneOf(BREADCRUMB_SIZES),
};

export const Breadcrumb = Object.assign(
  forwardRefAs<BreadcrumbProps, "nav">(
    (props, ref) => {
      const {
        align,
        as,
        children,
        separator,
        size,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("breadcrumb", rest.className, {
        [`has-${separator}-separator`]: separator,
        [`is-${align}`]: align,
        [`is-${size}`]: size,
      });

      return React.createElement(as!, {
        children: <ul>{children}</ul>,
        ref,
        ...rest,
      });
    },
    { as: "nav" },
  ),
  {
    Item: BreadcrumbItem,
    propTypes,
  },
);
