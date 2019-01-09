import classNames from "classnames";
import * as PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";

export type OtherHelpersProps = Partial<{
  /** Removes any margin */
  marginless: boolean;
  /** Removes any padding */
  paddingless: boolean;
  /** Removes any radius */
  radiusless: boolean;
  /** Removes any shadow */
  shadowless: boolean;
  /** Prevents the text from being selectable */
  unselectable: boolean;
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  marginless: PropTypes.bool,
  paddingless: PropTypes.bool,
  radiusless: PropTypes.bool,
  shadowless: PropTypes.bool,
  unselectable: PropTypes.bool,
}));

export const transform: TransformFunction<OtherHelpersProps> = props => {
  const {
    marginless,
    paddingless,
    radiusless,
    shadowless,
    unselectable,
    ...rest
  } = props;
  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    {
      "is-marginless": marginless,
      "is-paddingless": paddingless,
      "is-radiusless": radiusless,
      "is-shadowless": shadowless,
      "is-unselectable": unselectable,
    },
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
