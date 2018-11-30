type ModifiedProps<T, V> = Omit<V, keyof T> & { className: string };

export function makeModify<T>(
  classNameTransformer: <U extends T & { className?: string }>(
    props: U,
  ) => string,
  omitKeys: string[],
) {
  return <V extends T & object & { className?: string }>(props: V) => {
    const obj = Object.keys(props)
      .filter(key => !omitKeys.includes(key) && key !== "className")
      .map(key => ({ [key]: props[key] }))
      .reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          ...currentValue,
        }),
        {},
      ) as ModifiedProps<T, V>;
    // todo
    // obj.className = classNameTransformer(props);
    const className = classNameTransformer(props);
    if (className) {
      obj.className = classNameTransformer(props);
    }
    return obj;
  };
}
