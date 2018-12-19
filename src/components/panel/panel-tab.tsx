import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PanelTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabProps = HelpersProps & PanelTabModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
};

export const PanelTab = Object.assign(
  forwardRefAs<PanelTabProps, "a">(
    (props, ref) => {
      const { active, as, className: cn, ...rest } = transformHelpers(props);
      const className = classNames(cn, { "is-active": active }) || undefined;
      return React.createElement(as!, { className, ref, ...rest });
    },
    { as: "a" },
  ),
  { propTypes },
);
