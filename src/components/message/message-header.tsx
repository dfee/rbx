import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type MessageHeaderProps = HelpersProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps>(
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
