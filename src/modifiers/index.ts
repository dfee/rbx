import { cx } from "emotion";
import { ComponentProps } from "react";

import colors, { ColorsProps } from "./colors";
import helpers, { HelpersProps } from "./helpers";
import responsives, { ResponsivesProps } from "./responsives";
import typography, { TypographyProps } from "./typography";

// const compose = (...fns) => args => fns.reduce((arg, fn) => fn(arg), args);

export type ModifierProps = ColorsProps &
  HelpersProps &
  ResponsivesProps &
  TypographyProps;

export default {
  classNames: (props: ComponentProps<any>) =>
    cx(
      colors.classNames(props),
      helpers.classNames(props),
      responsives.classNames(props),
      typography.classNames(props),
    ),
  clean: (props: ComponentProps<any>) =>
    [colors.clean, helpers.clean, responsives.clean, typography.clean].reduce(
      (arg, fn) => fn(arg),
      props,
    ),
  // compose(
  //   colors.clean,
  //   helpers.clean,
  //   responsives.clean,
  //   typography.clean,
  // )(props),
};
