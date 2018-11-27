import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { renderAsExoticComponent } from "@/components/render-as-exotic-component";
import { ModifierProps } from "@/modifiers";

export type MessageHeaderModifierProps = Partial<{
  children: React.ReactNode;
}>;

export type MessageHeaderProps = ModifierProps & MessageHeaderModifierProps;

export const MessageHeader = renderAsExoticComponent<MessageHeaderProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("message-header", className)}>
      {children}
    </Element>
  ),
  "div",
);
MessageHeader.defaultProps = Object.assign(
  {
    children: null,
  },
  MessageHeader.defaultProps,
);
