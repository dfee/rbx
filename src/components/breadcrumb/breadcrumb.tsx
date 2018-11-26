import { cx } from "emotion";
import * as React from "react";

import renderAsExoticComponent from "components/render-as-exotic-component";
import modifiers, { ModifierProps } from "modifiers";

export type BreadcrumbModifierProps = Partial<{
  separator: "arrow" | "bullet" | "dot" | "succeeds";
  size: "small" | "medium" | "large";
  align: "right" | "center";
  items: Array<{ url: string; active?: boolean; name?: React.ReactNode }>;
  hrefAttr: string;
}>;

export type BreadcrumbProps = ModifierProps &
  BreadcrumbModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"a">, "unselectable">>;

const Breadcrumb = renderAsExoticComponent<BreadcrumbProps, "a">(
  (
    {
      className,
      items = [],
      renderAs,
      hrefAttr,
      separator,
      size,
      align,
      ...allProps
    },
    ref,
  ) => {
    const props = modifiers.clean(allProps);
    return (
      <nav
        {...props}
        ref={ref}
        className={cx("breadcrumb", className, modifiers.classNames(allProps), {
          [`has-${separator}-separator`]: separator,
          [`is-${size}`]: size,
          [`is-${align}`]: align,
        })}
      >
        <ul>
          {items.map(item => {
            let p = {};
            if (renderAs === "a") {
              p = { href: item.url };
            } else if (typeof hrefAttr === "string") {
              p = { hrefAttr: item.url };
            }
            return (
              <li
                key={item.url}
                className={cx({
                  "is-active": item.active,
                })}
              >
                {React.createElement(renderAs!, p, item.name)}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
  "a",
);

export default Breadcrumb;
