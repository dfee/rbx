import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { ListItem } from "./list-item";

export type ListModifierProps = Partial<{
  hoverable: boolean;
}>;

export type ListProps = HelpersProps & ListModifierProps;

const propTypes = {
  hoverable: PropTypes.bool,
};

export const List = Object.assign(
  forwardRefAs<ListProps, "div">(
    ({ className, hoverable, ...rest }, ref) => (
      <Generic
        className={classNames("list", { "is-hoverable": hoverable }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    Item: ListItem,
    propTypes,
  },
);
