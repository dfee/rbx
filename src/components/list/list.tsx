import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { ListItem } from "./list-item";

export type ListProps = HelpersProps;

export const List = Object.assign(
  forwardRefAs<ListProps>(
    ({ className, ...rest }, ref) => (
      <Generic ref={ref} className={classNames("list", className)} {...rest} />
    ),
    { as: "div" },
  ),
  { Item: ListItem },
);

List.displayName = "List";
