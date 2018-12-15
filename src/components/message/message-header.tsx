import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type MessageHeaderModifierProps = Partial<{ className: string }>;

export type MessageHeaderProps = HelpersProps & MessageHeaderModifierProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("message-header", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
