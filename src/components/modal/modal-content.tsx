import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ModalContentModifierProps = Partial<{ className: string }>;

export type ModalContentProps = HelpersProps & ModalContentModifierProps;

export const ModalContent = forwardRefAs<ModalContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("modal-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
