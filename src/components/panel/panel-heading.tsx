import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PanelHeadingModifierProps = Partial<{ className: string }>;
export type PanelHeadingProps = HelpersProps & PanelHeadingModifierProps;

export const PanelHeading = forwardRefAs<PanelHeadingProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("panel-heading", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
