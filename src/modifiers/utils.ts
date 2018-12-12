type TransformedProps<T, V> = Omit<V, keyof T>;

export function makeTransform<T>(
  classNameTransform: <U extends T & { className?: string }>(
    props: U,
  ) => string,
  removeKeys: string[],
) {
  return <V extends T & object & { className?: string }>(props: V) => {
    const className = classNameTransform(props);
    const initial = Object.assign({}, props, className ? { className } : null);

    // remove keys
    return Object.entries(initial)
      .filter(([key, value]) => !removeKeys.includes(key))
      .map(([key, value]) => ({ [key]: value }))
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}) as TransformedProps<T, V>;
  };
}
