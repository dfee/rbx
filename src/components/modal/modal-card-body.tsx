import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type ModalCardBodyProps = ModifierProps;

export const ModalCardBody = asExoticComponent<ModalCardBodyProps, "section">(
  (props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("modal-card-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "section",
);
