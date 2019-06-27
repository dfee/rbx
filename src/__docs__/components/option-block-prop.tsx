import * as React from "react";

export type OptionBlockPropProps = {
  name: string;
  value: string | number | boolean;
};

export const OptionBlockProp = ({ name, value }: OptionBlockPropProps) => {
  let normalizedValue: string | undefined;

  switch (typeof value) {
    case "boolean":
      normalizedValue = value === true ? undefined : "{false}";
      break;
    case "number":
      normalizedValue = `{${value}}`;
      break;
    case "undefined":
      normalizedValue = "{undefined}";
      break;
    default:
      normalizedValue = JSON.stringify(value);
  }
  const normalizedProp = `${name}${
    normalizedValue !== undefined ? `=${normalizedValue}` : ""
  }`;

  return (
    <code key={name} style={{ marginRight: "10px" }}>
      {normalizedProp}
    </code>
  );
};
