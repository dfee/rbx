import { Prefer } from "../../types";
import { TransformFunc } from "./types";

import { FloatHelpersProps, transformFloatHelpers } from "./float";
import { OtherHelpersProps, transformOtherHelpers } from "./other";
import { OverflowHelpersProps, transformOverflowHelpers } from "./overflow";
import { OverlayHelpersProps, transformOverlayHelpers } from "./overlay";
import {
  ResponsiveHelpersProps,
  transformResponsiveHelpers,
} from "./responsive";
import {
  transformTypographyHelpers,
  TypographyHelpersProps,
} from "./typography";
import {
  transformVisibilityHelpers,
  VisibilityHelpersProps,
} from "./visibility";

export { TransformFunc } from "./types";

/**
 * Union of helpers
 */
// tslint:disable-next-line: no-empty-interface
export interface HelpersPropsOverrides {}

export type HelpersProps = Prefer<
  HelpersPropsOverrides,
  FloatHelpersProps &
    OverflowHelpersProps &
    OverlayHelpersProps &
    TypographyHelpersProps &
    VisibilityHelpersProps &
    OtherHelpersProps &
    ResponsiveHelpersProps & { className?: string }
>;

export const combineTransformFunctions = <TTransformProps>(
  ...funcs: TransformFunc<any>[] // tslint:disable-line:no-any
): TransformFunc<TTransformProps> => (
  props,
  componentName,
  location = "prop",
) =>
  // tslint:disable-next-line:no-any
  funcs.reduce((acc, func) => func(acc, componentName, location) as any, props);

export const transformHelpers = combineTransformFunctions<HelpersProps>(
  transformFloatHelpers,
  transformOverflowHelpers,
  transformOverlayHelpers,
  transformTypographyHelpers,
  transformVisibilityHelpers,
  transformOtherHelpers,
  transformResponsiveHelpers,
);
