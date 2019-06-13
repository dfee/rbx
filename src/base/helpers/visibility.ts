import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";

export type VisibilityHelpersProps = Partial<{
  /** Hides an element (unclear on where this is documented in Bulma) */
  hidden: boolean;
  /** Adds visibility hidden */
  invisible: boolean;
  /**
   * Hide elements visually but keep the element available to be announced by a
   * screen reader
   */
  srOnly: boolean;
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  hidden: PropTypes.bool,
  invisible: PropTypes.bool,
  srOnly: PropTypes.bool,
}));

export const transform: TransformFunction<VisibilityHelpersProps> = props => {
  const { hidden, invisible, srOnly, ...rest } = props;

  rest.className = classNames(
    {
      "is-hidden": hidden,
      "is-invisible": invisible,
      "is-sr-only": srOnly,
    },
    rest.className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
