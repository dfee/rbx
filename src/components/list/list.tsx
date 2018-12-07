import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ListItem } from "./list-item";

export type ListModifierProps = Partial<{
  hoverable: boolean;
}>;

export type ListProps = ModifierProps & ListModifierProps;

export const List = Object.assign(
  forwardRefAs<ListProps, "div">((props, ref) => {
    const { as, hoverable, ...rest } = transformModifiers(props);
    rest.className = cx("list", rest.className, {
      "is-hoverable": hoverable,
    });
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  { Item: ListItem },
);

List.defaultProps = Object.assign({ hoverable: false }, List.defaultProps);
