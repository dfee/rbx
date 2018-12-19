import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type ListItemModifierProps = Partial<{
  active: boolean;
}>;

export type ListItemProps = HelpersProps & ListItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
};

export const ListItem = Object.assign(
  forwardRefAs<ListItemProps, "a">(
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
  ),
  { propTypes },
);
