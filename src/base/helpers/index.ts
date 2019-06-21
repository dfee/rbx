import { Prefer } from "../../types";

import { makeRootValidatingTransformFactory } from "./factory";
import {
  BadgeHelpersProps,
  makeValidatingTransform as badgeMVT,
} from "./badge";
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
  TooltipHelpersProps,
  makeValidatingTransform as tooltipMVT,
} from "./tooltip";
import {
  makeValidatingTransform as typographyMVT,
  TypographyHelpersProps,
} from "./typography";
import {
  makeValidatingTransform as visibilityMVT,
  VisibilityHelpersProps,
} from "./visibility";

/** Union of Helpers */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HelpersPropsOverrides {}

export type HelpersProps = Prefer<
  HelpersPropsOverrides,
  BadgeHelpersProps &
    FloatHelpersProps &
    OverflowHelpersProps &
    OverlayHelpersProps &
    TooltipHelpersProps &
    TypographyHelpersProps &
    VisibilityHelpersProps &
    OtherHelpersProps &
    ResponsiveHelpersProps & { className?: string }
>;

export const makeRootValidatingTransform = makeRootValidatingTransformFactory(
  badgeMVT,
  floatMVT,
  overflowMVT,
  overlayMVT,
  tooltipMVT,
  typographyMVT,
  visibilityMVT,
  otherMVT,
  responsiveMVT,
);
