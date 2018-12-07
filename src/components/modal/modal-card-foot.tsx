import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardFootModifierProps = Partial<{ className: string }>;

export type ModalCardFootProps = ModifierProps & ModalCardFootModifierProps;

export const ModalCardFoot = forwardRefAs<ModalCardFootProps, "footer">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "footer" },
);
