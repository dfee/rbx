import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PaginationLinkModifiers = {
  current?: boolean;
};

export type PaginationLinkProps = HelpersProps & PaginationLinkModifiers;

export const PaginationLink = forwardRefAs<PaginationLinkProps>(
  ({ className, current, ...rest }, ref) => (
    <li>
      <Generic
        ref={ref}
        className={classNames(
          "pagination-link",
          { "is-current": current },
          className,
        )}
        {...rest}
      />
    </li>
  ),
  { as: "a" },
);

PaginationLink.displayName = "Pagination.Link";
PaginationLink.propTypes = {
  current: PropTypes.bool,
};
