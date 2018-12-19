import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type PaginationLinkModifiers = Partial<{
  current: boolean;
}>;

export type PaginationLinkProps = HelpersProps & PaginationLinkModifiers;

const propTypes = {
  ...genericPropTypes,
  current: PropTypes.bool,
};

export const PaginationLink = Object.assign(
  forwardRefAs<PaginationLinkProps, "a">(
    (props, ref) => {
      const { as, current, ...rest } = transformHelpers(props);
      rest.className = classNames("pagination-link", rest.className, {
        "is-current": current,
      });
      return <li children={React.createElement(as!, { ref, ...rest })} />;
    },
    { as: "a" },
  ),
  { propTypes },
);
