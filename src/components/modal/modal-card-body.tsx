import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardBodyProps = ModifierProps;

export const ModalCardBody = forwardRefAs<ModalCardBodyProps, "section">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "section",
);
