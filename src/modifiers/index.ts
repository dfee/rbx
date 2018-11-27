import { cx } from "emotion";
import { ComponentProps } from "react";

import {
  classNames as colorsClassNames,
  clean as colorsClean,
  ColorsProps,
} from "./colors";
import {
  classNames as helpersClassNames,
  clean as helpersClean,
  HelpersProps,
} from "./helpers";
import {
  classNames as responsivesClassNames,
  clean as responsivesClean,
  ResponsivesProps,
} from "./responsives";
import {
  classNames as typographyClassNames,
  clean as typographyClean,
  TypographyProps,
} from "./typography";

export type ModifierProps = ColorsProps &
  HelpersProps &
  ResponsivesProps &
  TypographyProps;

export function classNames(props: ComponentProps<any>) {
  return cx(
    colorsClassNames(props),
    helpersClassNames(props),
    responsivesClassNames(props),
    typographyClassNames(props),
  );
}

export function clean(props: ComponentProps<any>) {
  return [colorsClean, helpersClean, responsivesClean, typographyClean].reduce(
    (arg, fn) => fn(arg),
    props,
  );
}
