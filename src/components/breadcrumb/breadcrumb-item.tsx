import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export interface BreadcrumbItemModifierProps {
  active?: boolean;
}

export type BreadcrumbItemProps = HelpersProps & BreadcrumbItemModifierProps;

const propTypes = {
  active: PropTypes.bool,
};

export const BreadcrumbItem = Object.assign(
  forwardRefAs<BreadcrumbItemProps, "a">(
    ({ active, ...rest }, ref) => (
      <li className={classNames({ "is-active": active })}>
        <Generic ref={ref} {...rest} />
      </li>
    ),
    { as: "a" },
  ),
  { propTypes },
);
