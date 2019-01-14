import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ListItem } from "./list-item";

export type ListProps = HelpersProps;

export const List = Object.assign(
  forwardRefAs<ListProps, "div">(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("list", className)} ref={ref} {...rest} />
    ),
    { as: "div" },
  ),
  { Item: ListItem },
);
