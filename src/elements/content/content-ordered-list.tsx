import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

import { ContentOrderedListItem } from "./content-ordered-list-item";

export const CONTENT_ORDERED_LIST_DEFAULTS = {
  types: ["lower-alpha", "lower-roman", "upper-alpha", "upper-roman"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContentOrderedListVariablesOverrides {}

export interface ContentOrderedListVariablesDefaults {
  types: (typeof CONTENT_ORDERED_LIST_DEFAULTS["types"])[number];
}

export type ContentOrderedListVariables = Prefer<
  ContentOrderedListVariablesOverrides,
  ContentOrderedListVariablesDefaults
>;

export type ContentOrderedListModifierProps = {
  type?: ContentOrderedListVariables["types"];
};

export type ContentOrderedListProps = HelpersProps &
  ContentOrderedListModifierProps;

export const ContentOrderedList = Object.assign(
  forwardRefAs<ContentOrderedListProps>(
    ({ className, type, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames({ [`is-${type}`]: type }, className)}
        {...rest}
      />
    ),
    { as: "ol" },
  ),
  {
    DEFAULTS: CONTENT_ORDERED_LIST_DEFAULTS,
    Item: ContentOrderedListItem,
  },
);

ContentOrderedList.displayName = "Content.OrderedList";
ContentOrderedList.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
