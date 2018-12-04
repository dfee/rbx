import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type MessageHeaderProps = ModifierProps;

export const MessageHeader = forwardRefAs<MessageHeaderProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("message-header", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
