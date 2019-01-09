import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";

export type OverflowHelpersProps = Partial<{
  /** Adds overflow hidden */
  clipped: boolean;
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  clipped: PropTypes.bool,
}));

export const transform: TransformFunction<OverflowHelpersProps> = props => {
  const { clipped, ...rest } = props;

  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    { "is-clipped": clipped },
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
