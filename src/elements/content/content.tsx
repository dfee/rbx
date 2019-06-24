import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

import { ContentOrderedList } from "./content-ordered-list";

export const CONTENT_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContentVariablesOverrides {}

export interface ContentVariablesDefaults {
  sizes: (typeof CONTENT_DEFAULTS["sizes"])[number];
}

export type ContentVariables = Prefer<
  ContentVariablesOverrides,
  ContentVariablesDefaults
>;

export type ContentModifierProps = {
  size?: ContentVariables["sizes"];
};

export type ContentProps = HelpersProps & ContentModifierProps;

export const Content = Object.assign(
  forwardRefAs<ContentProps>(
    ({ className, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames("content", { [`is-${size}`]: size }, className)}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    OrderedList: ContentOrderedList,
    VARIABLE_DEFAULTS: CONTENT_DEFAULTS,
  },
);

Content.displayName = "Content";
Content.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
