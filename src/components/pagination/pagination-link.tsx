import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type PaginationLinkModifiers = Partial<{
  current: boolean;
}>;

export type PaginationLinkProps = HelpersProps & PaginationLinkModifiers;

const propTypes = {
  current: PropTypes.bool,
};

export const PaginationLink = Object.assign(
  forwardRefAs<PaginationLinkProps, "a">(
    ({ className, current, ...rest }, ref) => (
      <li>
        <Generic
          className={classNames(
            "pagination-link",
            { "is-current": current },
            className,
          )}
          ref={ref}
          {...rest}
        />
      </li>
    ),
    { as: "a" },
  ),
  { propTypes },
);
