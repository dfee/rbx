import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LevelSideModifierProps = Partial<{
  align: string;
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type LevelSideProps = ModifierProps & LevelSideModifierProps;

export const LevelSide = asExoticComponent<LevelSideProps, "div">(
  (props, ref) => {
    const { as, align, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, {
      [`level-${align}`]: align,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);

LevelSide.defaultProps = Object.assign(
  { align: "left" },
  LevelSide.defaultProps,
);
