import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { renderAsExoticComponent } from "@/components/render-as-exotic-component";
import { ModifierProps } from "@/modifiers";

export type TabsTabModifierProps = Partial<{
  active: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type TabsTabProps = ModifierProps & TabsTabModifierProps;

export const Tab = renderAsExoticComponent<TabsTabModifierProps, "a">(
  ({ children, className, style, active, ...props }, ref) => (
    <li
      ref={ref}
      style={style}
      className={cx(className, {
        "is-active": active,
      })}
    >
      <Element {...props}>{children}</Element>
    </li>
  ),
  "a",
);
Tab.defaultProps = Object.assign(
  {
    active: false,
    children: null,
  },
  Tab.defaultProps,
);
