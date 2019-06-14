import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";
import { Variables } from "./variables";

export type TypographyHelpersProps = {
  backgroundColor?: Variables["colors"] | Variables["shades"];
  italic?: boolean;
  textAlign?: Variables["textAlignments"];
  textColor?: Variables["colors"] | Variables["shades"];
  textSize?: Variables["textSizes"];
  textTransform?: Variables["textTransforms"];
  textWeight?: Variables["textWeights"];
};

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  backgroundColor: PropTypes.oneOf([...vars.colors, ...vars.shades]),
  italic: PropTypes.bool,
  textAlign: PropTypes.oneOf(vars.textAlignments),
  textColor: PropTypes.oneOf([...vars.colors, ...vars.shades]),
  textSize: PropTypes.oneOf(vars.textSizes),
  textTransform: PropTypes.oneOf(vars.textTransforms),
  textWeight: PropTypes.oneOf(vars.textWeights),
}));

export const transform: TransformFunction<TypographyHelpersProps> = props => {
  const {
    backgroundColor,
    className,
    italic,
    textAlign,
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
        [`has-text-${textAlign}`]: textAlign,
        [`has-text-weight-${textWeight}`]: textWeight,
        [`is-size-${textSize}`]: textSize,
      },
      className,
    ),
    ...rest,
  };
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
