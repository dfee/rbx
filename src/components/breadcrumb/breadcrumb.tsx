import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
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
  ModifierProps & BreadcrumbModifierProps,
  React.HTMLAttributes<HTMLElement>
>;

export const Breadcrumb = Object.assign(
  forwardRefAs<BreadcrumbProps, "nav">((props, ref) => {
    const {
      align,
      as,
      children,
      separator,
      size,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("breadcrumb", rest.className, {
      [`has-${separator}-separator`]: separator,
      [`is-${align}`]: align,
      [`is-${size}`]: size,
    });

    return (
      <nav {...rest} ref={ref}>
        <ul>{children}</ul>
      </nav>
    );
  }, "nav"),
  { Item: BreadcrumbItem },
);
