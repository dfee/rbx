import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";
import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";

export const MESSAGE_SIZES = tuple("small", "medium", "large");
export type MessageSizes = (typeof MESSAGE_SIZES)[number];

export type MessageModifierProps = Partial<{
  className: string;
  color: Colors;
  size: MessageSizes;
}>;

export type MessageProps = ModifierProps & MessageModifierProps;

export const Message = Object.assign(
  forwardRefAs<MessageProps, "article">(
    (props, ref) => {
      const { as, color, size, ...rest } = transformModifiers(props);
      rest.className = classNames("message", rest.className, {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "article" },
  ),
  { Body: MessageBody, Header: MessageHeader },
);
