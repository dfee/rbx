import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Tab } from "./tab";

export type TabsModifierProps = Partial<{
  align: "centered" | "right";
  children: React.ReactNode;
  fullwidth: boolean;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
  /** This is called style on Bulma documentation */
  type: "toggle" | "boxed" | "toggle-rounded";
}>;

export type TabsProps = ModifierProps & TabsModifierProps;

export const Tabs = Object.assign(
  renderAsExoticComponent<TabsProps, "div">(
    ({ children, className, align, size, type, fullwidth, ...props }, ref) => (
      <Element
        {...props}
        ref={ref}
        className={cx("tabs", className, {
          [`is-${align}`]: align,
          [`is-${size}`]: size,
          "is-fullwidth": fullwidth,
          // todo: Bulma 0.6.2 is not releaset ATM
          "is-toggle": type === "toggle-rounded",
          [`is-${type}`]: type,
        })}
      >
        <ul>{children}</ul>
      </Element>
    ),
    "div",
  ),
  { Tab },
);
Tabs.defaultProps = Object.assign(
  {
    fullwidth: false,
  },
  Tabs.defaultProps,
);
