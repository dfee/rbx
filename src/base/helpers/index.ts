import { Prefer } from "../../types";
import { makeRootValidatingTransformFactory } from "./factory";

import {
  FloatHelpersProps,
  makeValidatingTransform as floatMVT,
} from "./float";
import {
  makeValidatingTransform as otherMVT,
  OtherHelpersProps,
} from "./other";
import {
  makeValidatingTransform as overflowMVT,
  OverflowHelpersProps,
} from "./overflow";
import {
  makeValidatingTransform as overlayMVT,
  OverlayHelpersProps,
} from "./overlay";
import {
  makeValidatingTransform as responsiveMVT,
  ResponsiveHelpersProps,
} from "./responsive";
import {
  makeValidatingTransform as typographyMVT,
  TypographyHelpersProps,
} from "./typography";
import {
  makeValidatingTransform as visibilityMVT,
  VisibilityHelpersProps,
} from "./visibility";

export { TransformFunction } from "./factory";

/** Union of Helpers */
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

export const makeRootValidatingTransform = makeRootValidatingTransformFactory<
  HelpersProps
>(
  floatMVT,
  overflowMVT,
  overlayMVT,
  typographyMVT,
  visibilityMVT,
  otherMVT,
  responsiveMVT,
);
