import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalContentProps = ModifierProps;

export const ModalContent = forwardRefAs<ModalContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
