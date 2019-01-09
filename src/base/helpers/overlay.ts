import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";

export type OverlayHelpersProps = Partial<{
  /** Completely covers the first positioned parent */
  overlay: boolean;
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  overlay: PropTypes.bool,
}));

export const transform: TransformFunction<OverlayHelpersProps> = props => {
  const { overlay, ...rest } = props;
  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    { "is-overlay": overlay },
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
