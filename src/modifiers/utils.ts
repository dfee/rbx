type TransformedProps<T, V> = Omit<V, keyof T>;

export function makeTransform<T>(
  classNameTransform: <U extends T & { className?: string }>(
    props: U,
  ) => string | undefined,
  removeKeys: string[],
) {
  return <V extends T & object & { className?: string }>(props: V) => {
    const className = classNameTransform(props);

    // removeKeys
    return Object.entries(Object.assign({}, props, { className }))
      .filter(([key, value]) => !removeKeys.includes(key))
      .map(([key, value]) => ({ [key]: value }))
      .reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          ...currentValue,
        }),
        {},
      ) as TransformedProps<T, V>;
  };
}
