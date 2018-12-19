import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { ListItem } from "./list-item";

export type ListModifierProps = Partial<{
  hoverable: boolean;
}>;

export type ListProps = HelpersProps & ListModifierProps;

const propTypes = {
  ...genericPropTypes,
  hoverable: PropTypes.bool,
};

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
  {
    Item: ListItem,
    propTypes,
  },
);
