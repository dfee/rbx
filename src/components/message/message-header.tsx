import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type MessageHeaderProps = HelpersProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("message-header", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

MessageHeader.displayName = "Message.Header";
