import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type MessageHeaderProps = HelpersProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("message-header", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

MessageHeader.displayName = "Message.Header";
