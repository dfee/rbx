import classNames from "classnames";
import * as PropTypes from "prop-types";

import { tuple } from "../../utils";
import { TransformFunc } from "./types";
import { COLORS, Colors, SHADES, Shades } from "./variables";

/**
 * Typography
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export const TEXT_ALIGNMENTS = tuple("centered", "justified", "left", "right");
export type TextAlignments = (typeof TEXT_ALIGNMENTS)[number];

export const TEXT_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TextSizes = (typeof TEXT_SIZES)[number];

export const TEXT_TRANSFORMS = tuple("capitalized", "lowercase", "uppercase");
export type TextTransforms = (typeof TEXT_TRANSFORMS)[number];

export const TEXT_WEIGHTS = tuple("light", "normal", "semibold", "bold");
export type TextWeights = (typeof TEXT_WEIGHTS)[number];

export type TypographyHelpersProps = Partial<{
  backgroundColor: Colors | Shades;
  italic: boolean;
  textAlignment: TextAlignments;
  textColor: Colors | Shades;
  textSize: TextSizes;
  textTransform: TextTransforms;
  textWeight: TextWeights;
}>;

export const typographyHelpersPropTypes = {
  backgroundColor: PropTypes.oneOf([...COLORS, ...SHADES]),
  italic: PropTypes.bool,
  textAlignment: PropTypes.oneOf(TEXT_ALIGNMENTS),
  textColor: PropTypes.oneOf([...COLORS, ...SHADES]),
  textSize: PropTypes.oneOf(TEXT_SIZES),
  textTransform: PropTypes.oneOf(TEXT_TRANSFORMS),
  textWeight: PropTypes.oneOf(TEXT_WEIGHTS),
};

export const transformTypographyHelpers: TransformFunc<
  TypographyHelpersProps
> = (props, componentName, location = "prop") => {
  PropTypes.checkPropTypes(
    typographyHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const {
    backgroundColor,
    className,
    italic,
    textAlignment,
    textColor,
    textSize,
    textTransform,
    textWeight,
    ...rest
  } = props;

  return {
    className: classNames(
      {
        [`has-background-${backgroundColor}`]: backgroundColor,
        [`has-text-${textColor}`]: textColor,
        "is-italic": italic,
        [`is-${textTransform}`]: textTransform,
        [`has-text-${textAlignment}`]: textAlignment,
        [`has-text-weight-${textWeight}`]: textWeight,
        [`is-size-${textSize}`]: textSize,
      },
      className,
    ),
    ...rest,
  };
};
