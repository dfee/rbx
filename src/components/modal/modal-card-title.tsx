import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardTitleProps = ModifierProps;

export const ModalCardTitle = forwardRefAs<ModalCardTitleProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-title", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "p",
);
