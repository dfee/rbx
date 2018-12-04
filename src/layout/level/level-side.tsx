import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LevelSideModifierProps = Partial<{
  align: "left" | "right";
}>;

export type LevelSideProps = ModifierProps & LevelSideModifierProps;

export const LevelSide = forwardRefAs<LevelSideProps, "div">((props, ref) => {
  const { as, align, ...rest } = transformModifiers(props);
  rest.className = cx(rest.className, {
    [`level-${align}`]: align,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");

LevelSide.defaultProps = Object.assign(
  { align: "left" },
  LevelSide.defaultProps,
);
