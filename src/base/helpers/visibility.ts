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

  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    {
      "is-hidden": hidden,
      "is-invisible": invisible,
      "is-sr-only": srOnly,
    },
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
