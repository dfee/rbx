import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";

export type MessageModifierProps = Partial<{
  color: Colors;
  size: "small" | "medium" | "large";
}>;

export type MessageProps = ModifierProps & MessageModifierProps;

export const Message = Object.assign(
  asExoticComponent<MessageProps, "article">((props, ref) => {
    const { as, color, size, ...rest } = modify(props);
    rest.className = cx("message", rest.className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  }, "article"),
  { Body: MessageBody, Header: MessageHeader },
);
