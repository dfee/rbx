import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
}>;

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

const propTypes = {
  ...genericPropTypes,
  arrowless: PropTypes.bool,
};

export const NavbarLink = Object.assign(
  forwardRefAs<NavbarLinkProps, "span">(
    (props, ref) => {
      const { as, arrowless, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-link", rest.className, {
        "is-arrowless": arrowless,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes },
);
