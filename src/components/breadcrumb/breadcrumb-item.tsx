import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export interface BreadcrumbItemModifierProps {
  active?: boolean;
}

export type BreadcrumbItemProps = HelpersProps & BreadcrumbItemModifierProps;

export const BreadcrumbItem = forwardRefAs<BreadcrumbItemProps>(
  ({ active, ...rest }, ref) => (
    <li className={classNames({ "is-active": active })}>
      <Generic ref={ref} {...rest} />
    </li>
  ),
  { as: "a" },
);

BreadcrumbItem.displayName = "Breadcrumb.Item";
BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
};
