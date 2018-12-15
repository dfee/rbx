import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { ListItem } from "./list-item";

export type ListModifierProps = Partial<{
  className: string;
  hoverable: boolean;
}>;

export type ListProps = HelpersProps & ListModifierProps;

export const List = Object.assign(
  forwardRefAs<ListProps, "div">(
    (props, ref) => {
      const { as, hoverable, ...rest } = transformHelpers(props);
      rest.className = classNames("list", rest.className, {
        "is-hoverable": hoverable,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    {
      as: "div",
      hoverable: false,
    },
  ),
  { Item: ListItem },
);
