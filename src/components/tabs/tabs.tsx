import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import TabsTab from "./components/tab";

export type TabsModifierProps = Partial<{
  align: "centered" | "right";
  children: React.ReactNode;
  fullwidth: "boolean";
  size: "small" | "medium" | "large";
  style: {};
  /** This is called style on Bulma documentation */
  type: "toggle" | "boxed" | "toggle-rounded";
}>;

export type TabsProps = ModifierProps & TabsModifierProps;

type Tabs = RenderAsExoticComponent<TabsProps, "div"> & {
  Tab: typeof TabsTab;
};

const Tabs: Partial<Tabs> = renderAsExoticComponent<TabsProps, "div">(
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
);
Tabs.defaultProps = Object.assign(
  {
    fullwidth: false,
  },
  Tabs.defaultProps,
);

Tabs.Tab = TabsTab;

export default Tabs as Tabs;
