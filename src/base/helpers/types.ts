import { Omit } from "../../types";

export type TransformFunc<TTransformProps extends {}> = <
  TProps extends TTransformProps & { className?: string }
>(
  props: TProps,
  componentName: string,
  location?: string,
) => Omit<TProps, keyof TTransformProps | "className"> & { className?: string };
