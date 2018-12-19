import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type ModalCardBodyProps = HelpersProps;

export const ModalCardBody = Object.assign(
  forwardRefAs<ModalCardBodyProps, "section">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("modal-card-body", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "section" },
  ),
  { propTypes: genericPropTypes },
);
