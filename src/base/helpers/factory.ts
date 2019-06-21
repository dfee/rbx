import PropTypes from "prop-types";

import { UnionToIntersection } from "../../types";

import { DEFAULTS, VariablesDefinitions } from "./variables";

type MakePropTypesFunction = (
  variables?: Partial<VariablesDefinitions>,
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
PropTypes.ValidationMap<any>;

type MakePropTypesFactoryFunction = (
  makePropTypes: (
    variables: VariablesDefinitions,
  ) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PropTypes.ValidationMap<any>,
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractTTransformProps<
  T extends MakeValidatingTransformFunction<any, any>
> = T extends MakeValidatingTransformFunction<infer U, any> ? U : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractTNewProps<
  T extends MakeValidatingTransformFunction<any, any>
> = T extends MakeValidatingTransformFunction<any, infer U> ? U : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

export const makeRootValidatingTransformFactory = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends MakeValidatingTransformFunction<any, any>[]
>(
  ...mvtfs: T
) => (variables: Partial<VariablesDefinitions>) => {
  const vtfs = mvtfs.map(func => func({ ...DEFAULTS, ...variables }));
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vtfs.reduce((acc, vtf) => vtf(acc, componentName, location), props) as any;
};
