import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ModalCardTitleModifierProps = Partial<{ className: string }>;

export type ModalCardTitleProps = ModifierProps & ModalCardTitleModifierProps;

export const ModalCardTitle = forwardRefAs<ModalCardTitleProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("modal-card-title", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
