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

  rest.className = classNames({ "is-clipped": clipped }, rest.className);

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
