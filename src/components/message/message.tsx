import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";
import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";

export type MessageModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type MessageProps = ModifierProps & MessageModifierProps;

export const Message = Object.assign(
  extendedForwardRef<MessageProps, "article">(
    ({ children, className, color, size, ...props }, ref) => (
      <Element
        {...props}
        ref={ref}
        className={cx("message", className, {
          [`is-${color}`]: color,
          [`is-${size}`]: size,
        })}
      >
        {children}
      </Element>
    ),
    "article",
  ),
  { Body: MessageBody, Header: MessageHeader },
);
Message.defaultProps = Object.assign(
  {
    children: null,
  },
  Message.defaultProps,
);
