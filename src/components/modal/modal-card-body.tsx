import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type ModalCardBodyModifierProps = Partial<{ className: string }>;

export type ModalCardBodyProps = ModifierProps & ModalCardBodyModifierProps;

export const ModalCardBody = forwardRefAs<ModalCardBodyProps, "section">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("modal-card-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "section" },
);
