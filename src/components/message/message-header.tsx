import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type MessageHeaderModifierProps = Partial<{ className: string }>;

export type MessageHeaderProps = ModifierProps & MessageHeaderModifierProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("message-header", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
