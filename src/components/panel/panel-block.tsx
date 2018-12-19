import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
}>;

export type PanelBlockProps = HelpersProps & PanelBlockModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
};

export const PanelBlock = Object.assign(
  forwardRefAs<PanelBlockProps, "div">(
    (props, ref) => {
      const { active, as, ...rest } = transformHelpers(props);
      rest.className = classNames("panel-block", rest.className, {
        "is-active": active,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    {
      as: "div",
    },
  ),
  { propTypes },
);
