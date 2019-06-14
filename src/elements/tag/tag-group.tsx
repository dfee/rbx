import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const TAG_GROUP_DEFAULTS = {
  sizes: ["medium", "large"] as const,
};

export interface TagGroupVariablesOverrides {}

export interface TagGroupVariablesDefaults {
  sizes: (typeof TAG_GROUP_DEFAULTS["sizes"])[number];
}

export type TagGroupVariables = Prefer<
  TagGroupVariablesOverrides,
  TagGroupVariablesDefaults
>;

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
  size: TagGroupVariables["sizes"];
}>;

export type TagGroupProps = HelpersProps & TagGroupModifierProps;

export const TagGroup = forwardRefAs<TagGroupProps>(
  ({ className, gapless, size, ...rest }, ref) => (
    <Generic
      className={classNames(
        "tags",
        {
          [`are-${size}`]: size,
          "has-addons": gapless,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

TagGroup.displayName = "Tag.Group";
TagGroup.propTypes = {
  gapless: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
