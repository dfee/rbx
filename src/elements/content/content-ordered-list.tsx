import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
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

export type ContentOrderedListProps = Prefer<
  HelpersProps & ContentOrderedListModifierProps,
  Omit<React.HTMLAttributes<HTMLOListElement>, "type">
>;

const propTypes = {
  ...genericPropTypes,
  type: PropTypes.oneOf(CONTENT_ORDERED_LIST_TYPES),
};

export const ContentOrderedList = Object.assign(
  forwardRefAs<ContentOrderedListProps, "ol">(
    (props, ref) => {
      const { as, type, ...rest } = transformHelpers(props);
      rest.className = classNames(rest.className, {
        [`is-${type}`]: type,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "ol" },
  ),
  {
    Item: ContentOrderedListItem,
    propTypes,
  },
);
