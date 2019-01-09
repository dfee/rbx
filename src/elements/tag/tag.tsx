import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";
import { tuple } from "../../utils";
import { TagGroup } from "./tag-group";

export const TAG_SIZES = tuple("normal", "medium", "large");
export type TagSizes = (typeof TAG_SIZES)[number];

export type TagModifierProps = Partial<{
  color: Variables["Colors"];
  delete: boolean; // tslint:disable-line:no-reserved-keywords
  rounded: boolean;
  size: TagSizes;
}>;

export type TagProps = HelpersProps & TagModifierProps;

const propTypes = {
  color: PropTypes.oneOf(DEFAULTS.colors),
  delete: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(TAG_SIZES),
};

export const Tag = Object.assign(
  forwardRefAs<TagProps, "span">(
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
  {
    Group: TagGroup,
    propTypes,
  },
);
