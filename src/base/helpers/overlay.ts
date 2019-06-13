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
  rest.className = classNames({ "is-overlay": overlay }, rest.className);

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
