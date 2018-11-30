import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type ModalCardFootProps = ModifierProps;

export const ModalCardFoot = asExoticComponent<ModalCardFootProps, "footer">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("modal-card-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "footer",
);
