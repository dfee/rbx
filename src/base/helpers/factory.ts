import * as PropTypes from "prop-types";

import { Omit, ReturnType } from "../../types";
import { DEFAULTS, VariablesDefinitions } from "./variables";

export const makePropTypesFactory: MakePropTypesFactoryFunction = makePropTypes => variables =>
  makePropTypes({ ...DEFAULTS, ...variables });

export type MakeValidatingTransformFunction<T> = (
  variables?: Partial<VariablesDefinitions>,
) => (
  props: T,
  componentName: string,
  location?: string,
) => ReturnType<TransformFunction<T>>;

export const makeValidatingTransformFactory = <T extends {}>(
  makePropTypesFunc: ReturnType<MakePropTypesFactoryFunction>,
  transformFunc: TransformFunction<T>,
): MakeValidatingTransformFunction<T> => (variables = DEFAULTS) => {
  const propTypes = makePropTypesFunc(variables);

  return (
    props: T,
    componentName: string,
    location: string = "prop",
  ): ReturnType<TransformFunction<T>> => {
    PropTypes.checkPropTypes(propTypes, props, location, componentName);

    // Can remove "no-any" with TypeScript 3.3
    // https://github.com/Microsoft/TypeScript/pull/29121
    // tslint:disable-next-line: no-any
    return transformFunc(props) as any;
  };
};

export const MakeRootValidatingTransformFactory = <TTransformProps extends {}>(
  // tslint:disable-next-line:no-any
  ...makeValidatingTransformFuncs: MakeValidatingTransformFunction<any>[]
): MakeValidatingTransformFunction<TTransformProps> => (
  variables = DEFAULTS,
): ValidatingTransformFunction<TTransformProps> => {
  const validatingTransformFuncs = makeValidatingTransformFuncs.map(func =>
    func(variables),
  );

  return (props, componentName, location = "prop") =>
    validatingTransformFuncs.reduce(
      // tslint:disable-next-line:no-any
      (acc, func) => func(acc, componentName, location) as any,
      props,
    );
};

type MakePropTypesFunction = (
  variables: VariablesDefinitions,
) => PropTypes.ValidationMap<any>; // tslint:disable-line:no-any

type MakePropTypesFactoryFunction = (
  makePropTypes: MakePropTypesFunction,
) => (
  variables?: Partial<VariablesDefinitions>,
) => ReturnType<MakePropTypesFunction>;

export type TransformFunction<TTransformProps extends {}> = <
  TProps extends TTransformProps & { className?: string }
>(
  props: TProps,
) => Omit<TProps, keyof TTransformProps>;

export type ValidatingTransformFunction<TTransformProps extends {}> = <
  TProps extends TTransformProps & { className?: string }
>(
  props: TProps,
  componentName: string,
  location?: string,
) => ReturnType<TransformFunction<TTransformProps>>;
