import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PanelIconProps = HelpersProps;

export const PanelIcon = Object.assign(
  forwardRefAs<PanelIconProps, "span">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("panel-icon", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes: genericPropTypes },
);
