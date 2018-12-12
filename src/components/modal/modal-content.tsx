import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalContentModifierProps = Partial<{ className: string }>;

export type ModalContentProps = ModifierProps & ModalContentModifierProps;

export const ModalContent = forwardRefAs<ModalContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("modal-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
