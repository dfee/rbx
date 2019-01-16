export const mapEnumerable = (value: (string | number)[]) =>
  value.map(v => (typeof v === "string" ? `"${v}"` : `${v}`)).join(" │ ");
