import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Tab } from "./tab";

export type TabsModifierProps = Partial<{
  align: "centered" | "right";
  fullwidth: boolean;
  size: "small" | "medium" | "large";
  /**
   * This is called style on Bulma documentation
   */
  type: "toggle" | "boxed" | "toggle-rounded";
}>;

export type TabsProps = ModifierProps & TabsModifierProps;

export const Tabs = Object.assign(
  forwardRefAs<TabsProps, "div">((props, ref) => {
    const {
      align,
      as,
      children,
      fullwidth,
      size,
      type,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("tabs", rest.className, {
      [`is-${align}`]: align,
      [`is-${size}`]: size,
      "is-fullwidth": fullwidth,
      "is-toggle": type === "toggle-rounded",
      [`is-${type}`]: type,
    });
    return React.createElement(as!, {
      children: <ul>{children}</ul>,
      ref,
      ...rest,
    });
  }, "div"),
  { Tab },
);

Tabs.defaultProps = Object.assign({ fullwidth: false }, Tabs.defaultProps);
