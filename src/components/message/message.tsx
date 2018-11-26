import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import MessageBody from "./MessageBody";
import MessageHeader from "./MessageHeader";

export type MessageModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type MessageProps = ModifierProps & MessageModifierProps;

type Message = RenderAsExoticComponent<MessageProps, "article"> & {
  Body: typeof MessageBody;
  Header: typeof MessageHeader;
};

const Message: Partial<Message> = renderAsExoticComponent<
  MessageProps,
  "article"
>(
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
);
Message.defaultProps = Object.assign(
  {
    children: null,
  },
  Message.defaultProps,
);

Message.Body = MessageBody;
Message.Header = MessageHeader;

export default Message as Message;
