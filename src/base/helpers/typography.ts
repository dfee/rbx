import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";
import { Variables } from "./variables";

export type TypographyHelpersProps = Partial<{
  backgroundColor: Variables["colors"] | Variables["shades"];
  italic: boolean;
  textAlignment: Variables["textAlignments"];
  textColor: Variables["colors"] | Variables["shades"];
  textSize: Variables["textSizes"];
  textTransform: Variables["textTransforms"];
  textWeight: Variables["textWeights"];
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  backgroundColor: PropTypes.oneOf([...vars.colors, ...vars.shades]),
  italic: PropTypes.bool,
  textAlignment: PropTypes.oneOf(vars.textAlignments),
  textColor: PropTypes.oneOf([...vars.colors, ...vars.shades]),
  textSize: PropTypes.oneOf(vars.textSizes),
  textTransform: PropTypes.oneOf(vars.textTransforms),
  textWeight: PropTypes.oneOf(vars.textWeights),
}));

export const transform: TransformFunction<TypographyHelpersProps> = props => {
  const {
    backgroundColor,
    italic,
    textAlignment,
    textColor,
    textSize,
    textTransform,
    textWeight,
    ...rest
  } = props;

  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    {
      [`has-background-${backgroundColor}`]: backgroundColor,
      [`has-text-${textColor}`]: textColor,
      "is-italic": italic,
      [`is-${textTransform}`]: textTransform,
      [`has-text-${textAlignment}`]: textAlignment,
      [`has-text-weight-${textWeight}`]: textWeight,
      [`is-size-${textSize}`]: textSize,
    },
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
