import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const LEVEL_SIDE_ALIGNMENTS = tuple("left", "right");
export type LevelSideAlignments = (typeof LEVEL_SIDE_ALIGNMENTS)[number];

export type LevelSideModifierProps = Partial<{
  align: LevelSideAlignments;
  className: string;
}>;

export type LevelSideProps = ModifierProps & LevelSideModifierProps;

export const LevelSide = forwardRefAs<LevelSideProps, "div">(
  (props, ref) => {
    const { as, align, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, {
      [`level-${align}`]: align,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    align: "left",
    as: "div",
  },
);
