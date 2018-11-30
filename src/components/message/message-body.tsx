import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type MessageBodyProps = ModifierProps;

export const MessageBody = asExoticComponent<MessageBodyProps, "div">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("message-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
