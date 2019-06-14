import PropTypes from "prop-types";

import { UnionToIntersection } from "../../types";
import { DEFAULTS, VariablesDefinitions } from "./variables";

type MakePropTypesFunction = (
  variables?: Partial<VariablesDefinitions>,
) => PropTypes.ValidationMap<any>; // tslint:disable-line:no-any

type MakePropTypesFactoryFunction = (
  makePropTypes: (
    variables: VariablesDefinitions,
  ) => PropTypes.ValidationMap<any>, // tslint:disable-line:no-any
) => MakePropTypesFunction;

export const makePropTypesFactory: MakePropTypesFactoryFunction = makePropTypes => variables =>
  makePropTypes({ ...DEFAULTS, ...variables });

export type TransformFunction<
  TTransformProps extends {},
  TNewProps extends {} = {}
> = <P extends { className?: string | undefined } & Partial<TTransformProps>>(
  props: P,
) => Omit<P, keyof TTransformProps | "className"> & {
  className: string | undefined;
} & TNewProps;

export type ValidatingTransformFunction<
  TTransformProps extends {},
  TNewProps extends {}
> = <P extends { className?: string | undefined } & Partial<TTransformProps>>(
  props: P,
  componentName: string,
  location?: string,
) => ReturnType<TransformFunction<TTransformProps, TNewProps>>;

export type MakeValidatingTransformFunction<
  TTransformProps extends {},
  TNewProps extends {}
> = <P extends { className?: string | undefined } & Partial<TTransformProps>>(
  variables?: VariablesDefinitions,
) => (
  props: P,
  componentName: string,
  location?: string,
) => ReturnType<TransformFunction<TTransformProps, TNewProps>>;

export const makeValidatingTransformFactory = <
  TTransformProps extends {},
  TNewProps extends {}
>(
  makePropTypesFunc: MakePropTypesFunction,
  transformFunc: TransformFunction<TTransformProps, TNewProps>,
): MakeValidatingTransformFunction<TTransformProps, TNewProps> => (
  variables = DEFAULTS,
): ValidatingTransformFunction<TTransformProps, TNewProps> => {
  const propTypes = makePropTypesFunc(variables);

  return (props, componentName, location = "prop") => {
    PropTypes.checkPropTypes(propTypes, props, location, componentName);
    return transformFunc(props);
  };
};

// tslint: disable:no-any
export type ExtractTTransformProps<
  T extends MakeValidatingTransformFunction<any, any>
> = T extends MakeValidatingTransformFunction<infer U, any> ? U : never;
// tslint: enable:no-any

// tslint: disable:no-any
export type ExtractTNewProps<
  T extends MakeValidatingTransformFunction<any, any>
> = T extends MakeValidatingTransformFunction<any, infer U> ? U : never;
// tslint: enable:no-any

export const makeRootValidatingTransformFactory = <
  // tslint:disable-next-line:no-any
  T extends MakeValidatingTransformFunction<any, any>[]
>(
  ...mvtfs: T
) => (variables: VariablesDefinitions) => {
  const vtfs = mvtfs.map(func => func(variables));
  return <
    P extends { className?: string | undefined } & UnionToIntersection<
      ExtractTTransformProps<T[number]>
    >
  >(
    props: P,
    componentName: string,
    location: string = "prop",
  ): Omit<P, keyof UnionToIntersection<ExtractTTransformProps<T[number]>>> & {
    className: string | undefined;
  } & UnionToIntersection<ExtractTNewProps<T[number]>> =>
    // tslint:disable-next-line:no-any
    vtfs.reduce((acc, vtf) => vtf(acc, componentName, location), props) as any;
};
