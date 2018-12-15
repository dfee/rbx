import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ModalCardFootModifierProps = Partial<{ className: string }>;

export type ModalCardFootProps = HelpersProps & ModalCardFootModifierProps;

export const ModalCardFoot = forwardRefAs<ModalCardFootProps, "footer">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-card-foot", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "footer" },
);
