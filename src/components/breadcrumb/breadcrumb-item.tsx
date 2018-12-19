import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export interface BreadcrumbItemModifierProps {
  active?: boolean;
}

export type BreadcrumbItemProps = HelpersProps & BreadcrumbItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
};

export const BreadcrumbItem = Object.assign(
  forwardRefAs<BreadcrumbItemProps, "a">(
    (props, ref) => {
      const { as, active, ...rest } = transformHelpers(props);
      return (
        <li className={classNames({ "is-active": active }) || undefined}>
          {React.createElement(as!, { ref, ...rest })}
        </li>
      );
    },
    { as: "a" },
  ),
  { propTypes },
);
