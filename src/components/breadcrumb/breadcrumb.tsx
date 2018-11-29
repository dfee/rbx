import { cx } from "emotion";
import * as React from "react";

import { extendedForwardRef } from "@/components/element";
import { ModifierProps, modify } from "@/modifiers";

export interface BreadcrumbItemProps {
  url: string;
  active?: boolean;
  name?: React.ReactNode;
}

export type BreadcrumbModifierProps = Partial<{
  align: "right" | "center";
  className: string;
  hrefAttr: string;
  items: BreadcrumbItemProps[];
  separator: "arrow" | "bullet" | "dot" | "succeeds";
  size: "small" | "medium" | "large";
}>;

export type BreadcrumbProps = ModifierProps &
  BreadcrumbModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"a">, "unselectable">>;

export const Breadcrumb = extendedForwardRef<BreadcrumbProps, "a">(
  (props, ref) => {
    const { align, as, hrefAttr, items, separator, size, ...rest } = modify(
      props,
    );
    rest.className = cx("breadcrumb", rest.className, {
      [`has-${separator}-separator`]: separator,
      [`is-${align}`]: align,
      [`is-${size}`]: size,
    });

    return (
      <nav {...rest} ref={ref}>
        <ul>
          {items!.map(item => {
            const itemProps: { [s: string]: BreadcrumbItemProps["url"] } = {};
            if (as === "a") {
              itemProps.href = item.url;
            } else if (typeof hrefAttr === "string") {
              itemProps[hrefAttr] = item.url;
            }
            return (
              <li key={item.url} className={cx({ "is-active": item.active })}>
                {React.createElement(as!, itemProps, item.name)}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
  "a",
);
Breadcrumb.defaultProps = Object.assign({ items: [] }, Breadcrumb.defaultProps);
