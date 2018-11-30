import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardFootProps = ModifierProps;

export const ModalCardFoot = forwardRefAs<ModalCardFootProps, "footer">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "footer",
);
