import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export interface BreadcrumbItemModifierProps {
  active?: boolean;
}

export type BreadcrumbItemProps = HelpersProps & BreadcrumbItemModifierProps;

export const BreadcrumbItem = forwardRefAs<BreadcrumbItemProps, "a">(
  (props, ref) => {
    const { as, active, ...rest } = transformHelpers(props);
    return (
      <li className={classNames({ "is-active": active }) || undefined}>
        {React.createElement(as!, { ref, ...rest })}
      </li>
    );
  },
  { as: "a" },
);
