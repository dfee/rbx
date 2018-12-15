import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type ListItemModifierProps = Partial<{
  active: boolean;
  className: string;
}>;

export type ListItemProps = HelpersProps & ListItemModifierProps;

export const ListItem = forwardRefAs<ListItemProps, "a">(
  (props, ref) => {
    const { active, as, ...rest } = transformHelpers(props);
    rest.className = classNames("list-item", rest.className, {
      "is-active": active,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    active: false,
    as: "a",
  },
);
