import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type MessageBodyProps = HelpersProps;

export const MessageBody = forwardRefAs<MessageBodyProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("message-body", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

MessageBody.displayName = "Message.Body";
