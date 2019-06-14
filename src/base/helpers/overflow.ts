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
  const { className, clipped, ...rest } = props;

  return {
    className: classNames({ "is-clipped": clipped }, className),
    ...rest,
  };
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
