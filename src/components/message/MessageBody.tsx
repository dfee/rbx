import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type MessageBoodyModifierProps = Partial<{
  children: React.ReactNode;
}>;

export type MessageBodyProps = ModifierProps & MessageBoodyModifierProps;

const MessageBody = renderAsExoticComponent<MessageBodyProps, "div">(
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

export default MessageBody;
