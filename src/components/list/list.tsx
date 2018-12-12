import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ListItem } from "./list-item";

export type ListModifierProps = Partial<{
  className: string;
  hoverable: boolean;
}>;

export type ListProps = ModifierProps & ListModifierProps;

export const List = Object.assign(
  forwardRefAs<ListProps, "div">(
    (props, ref) => {
      const { as, hoverable, ...rest } = transformModifiers(props);
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
