import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type ModalCardTitleProps = HelpersProps;

export const ModalCardTitle = Object.assign(
  forwardRefAs<ModalCardTitleProps, "p">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("modal-card-title", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes: genericPropTypes },
);
