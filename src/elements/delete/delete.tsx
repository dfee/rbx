import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps } from "@/modifiers";
import { tuple } from "@/utils";

export const DELETE_SIZES = tuple("small", "medium", "large", "auto");
export type DeleteSizes = (typeof DELETE_SIZES)[number];

export type DeleteModifierProps = Partial<{
  size: DeleteSizes;
}>;

export type DeleteProps = ModifierProps & DeleteModifierProps;

export const Delete = forwardRefAs<DeleteProps, "a">((props, ref) => {
  const { as, size, ...rest } = props;
  rest.className = cx("delete", rest.className, {
    [`is-${size}`]: size !== "auto",
  });
  return React.createElement(as!, { ref, ...rest });
}, "a");

Delete.defaultProps = Object.assign({ size: "auto" }, Delete.defaultProps);
