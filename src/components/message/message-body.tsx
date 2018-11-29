import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type MessageBoodyModifierProps = Partial<{
  children: React.ReactNode;
}>;

export type MessageBodyProps = ModifierProps & MessageBoodyModifierProps;

export const MessageBody = extendedForwardRef<MessageBodyProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("message-body", className)}>
      {children}
    </Element>
  ),
  "div",
);
MessageBody.defaultProps = Object.assign(
  {
    children: null,
  },
  MessageBody.defaultProps,
);
