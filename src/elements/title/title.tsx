import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const TITLE_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TitleSizes = (typeof TITLE_SIZES)[number];

export const TITLE_WEIGHTS = tuple("light", "normal", "semibold", "bold");
export type TitleWeights = (typeof TITLE_WEIGHTS)[number];

export type TitleModifierProps = Partial<{
  className: string;
  size: TitleSizes;
  spaced: boolean;
  subtitle: boolean;
  weight: TitleWeights;
}>;

export type TitleProps = ModifierProps & TitleModifierProps;

export const Title = forwardRefAs<TitleProps, "h1">(
  (props, ref) => {
    const { as, size, spaced, subtitle, weight, ...rest } = transformModifiers(
      props,
    );
    rest.className = cx(rest.className, {
      [`is-${size}`]: !!size,
      "is-spaced": spaced && !subtitle,
      subtitle,
      title: !subtitle,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "h1",
    spaced: false,
    subtitle: false,
  },
);
