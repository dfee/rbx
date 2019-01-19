import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { ListItem } from "./list-item";

export type ListProps = HelpersProps;

export const List = Object.assign(
  forwardRefAs<ListProps>(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("list", className)} ref={ref} {...rest} />
    ),
    { as: "div" },
  ),
  { Item: ListItem },
);

List.displayName = "List";
