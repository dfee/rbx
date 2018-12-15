import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type MessageBodyModifierProps = Partial<{ className: string }>;

export type MessageBodyProps = HelpersProps & MessageBodyModifierProps;

export const MessageBody = forwardRefAs<MessageBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("message-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
