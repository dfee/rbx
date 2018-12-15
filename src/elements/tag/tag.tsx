import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";
import { tuple } from "../../utils";
import { TagGroup } from "./tag-group";

export const TAG_SIZES = tuple("normal", "medium", "large");
export type TagSizes = (typeof TAG_SIZES)[number];

export type TagModifierProps = Partial<{
  className: string;
  color: Colors;
  delete: boolean;
  rounded: boolean;
  size: TagSizes;
}>;

export type TagProps = HelpersProps & TagModifierProps;

export const Tag = Object.assign(
  forwardRefAs<TagProps, "span">(
    (props, ref) => {
      const {
        as,
        children,
        color,
        delete: isDelete,
        rounded,
        size,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("tag", rest.className, {
        [`is-${size}`]: size,
        [`is-${color}`]: color,
        "is-delete": isDelete,
        "is-rounded": rounded,
      });
      return React.createElement(as!, {
        children: !isDelete && children,
        ref,
        ...rest,
      });
    },
    { as: "span" },
  ),
  { Group: TagGroup },
);
