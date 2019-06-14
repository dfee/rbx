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
  const { className, overlay, ...rest } = props;

  return {
    className: classNames({ "is-overlay": overlay }, className),
    ...rest,
  };
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
