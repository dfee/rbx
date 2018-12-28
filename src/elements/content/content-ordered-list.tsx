import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { ContentOrderedListItem } from "./content-ordered-list-item";

export const CONTENT_ORDERED_LIST_TYPES = tuple(
  "lower-alpha",
  "lower-roman",
  "upper-alpha",
  "upper-roman",
);
export type ContentOrderedListTypes = (typeof CONTENT_ORDERED_LIST_TYPES)[number];

export type ContentOrderedListModifierProps = Partial<{
  type: ContentOrderedListTypes;
}>;

export type ContentOrderedListProps = HelpersProps &
  ContentOrderedListModifierProps;

const propTypes = {
  type: PropTypes.oneOf(CONTENT_ORDERED_LIST_TYPES),
};

export const ContentOrderedList = Object.assign(
  forwardRefAs<ContentOrderedListProps, "ol">(
    ({ className, type, ...rest }, ref) => (
      <Generic
        className={classNames({ [`is-${type}`]: type }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "ol" },
  ),
  {
    Item: ContentOrderedListItem,
    propTypes,
  },
);
