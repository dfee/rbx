import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { TagGroup } from "./tag-group";

export const TAG_DEFAULTS = {
  sizes: ["normal", "medium", "large"] as const,
};

export interface TagVariablesOverrides {}

export interface TagVariablesDefaults {
  sizes: (typeof TAG_DEFAULTS["sizes"])[number];
}

export type TagVariables = Prefer<TagVariablesOverrides, TagVariablesDefaults>;

export type TagModifierProps = Partial<{
  color: Variables["colors"];
  delete: boolean; // tslint:disable-line:no-reserved-keywords
  rounded: boolean;
  size: TagVariables["sizes"];
}>;

export type TagProps = HelpersProps & TagModifierProps;

export const Tag = Object.assign(
  forwardRefAs<TagProps>(
    (
      { children, className, color, delete: isDelete, rounded, size, ...rest },
      ref,
    ) => {
      const allowedChildren = isDelete === true ? undefined : children;

      return (
        <Generic
          className={classNames(
            "tag",
            {
              [`is-${size}`]: size,
              [`is-${color}`]: color,
              "is-delete": isDelete,
              "is-rounded": rounded,
            },
            className,
          )}
          children={allowedChildren}
          ref={ref}
          {...rest}
        />
      );
    },
    { as: "span" },
  ),
  { Group: TagGroup },
);

Tag.displayName = "Tag";
Tag.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delete: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
