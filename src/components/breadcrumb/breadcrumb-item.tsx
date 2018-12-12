import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export interface BreadcrumbItemModifierProps {
  active?: boolean;
}

export type BreadcrumbItemProps = ModifierProps & BreadcrumbItemModifierProps;

export const BreadcrumbItem = forwardRefAs<BreadcrumbItemProps, "a">(
  (props, ref) => {
    const { as, active, ...rest } = transformModifiers(props);
    return (
      <li className={classNames({ "is-active": active }) || undefined}>
        {React.createElement(as!, { ref, ...rest })}
      </li>
    );
  },
  { as: "a" },
);
