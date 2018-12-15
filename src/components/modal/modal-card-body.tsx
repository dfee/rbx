import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ModalCardBodyModifierProps = Partial<{ className: string }>;

export type ModalCardBodyProps = HelpersProps & ModalCardBodyModifierProps;

export const ModalCardBody = forwardRefAs<ModalCardBodyProps, "section">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-card-body", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "section" },
);
