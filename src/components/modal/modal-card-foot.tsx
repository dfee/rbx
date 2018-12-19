import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type ModalCardFootProps = HelpersProps;

export const ModalCardFoot = Object.assign(
  forwardRefAs<ModalCardFootProps, "footer">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("modal-card-foot", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "footer" },
  ),
  { propTypes: genericPropTypes },
);
