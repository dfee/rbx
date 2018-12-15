import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type MessageBodyModifierProps = Partial<{ className: string }>;

export type MessageBodyProps = ModifierProps & MessageBodyModifierProps;

export const MessageBody = forwardRefAs<MessageBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("message-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
