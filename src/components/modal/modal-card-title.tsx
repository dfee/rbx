import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ModalCardTitleModifierProps = Partial<{ className: string }>;

export type ModalCardTitleProps = HelpersProps & ModalCardTitleModifierProps;

export const ModalCardTitle = forwardRefAs<ModalCardTitleProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-card-title", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
