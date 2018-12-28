import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { ContentOrderedList } from "./content-ordered-list";

export const CONTENT_SIZES = tuple("small", "medium", "large");
export type ContentSizes = (typeof CONTENT_SIZES)[number];

export type ContentModifierProps = Partial<{
  size: ContentSizes;
}>;

export type ContentProps = HelpersProps & ContentModifierProps;

const propTypes = {
  size: PropTypes.oneOf(CONTENT_SIZES),
};

export const Content = Object.assign(
  forwardRefAs<ContentProps, "div">(
    ({ className, size, ...rest }, ref) => (
      <Generic
        className={classNames("content", { [`is-${size}`]: size }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    OrderedList: ContentOrderedList,
    propTypes,
  },
);
