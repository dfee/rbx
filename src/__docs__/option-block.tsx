import React from "react";

import { Block, Title } from "src/elements";

export type OptionBlockProps = {
  index: number;
  children: React.ReactNode;
  name: string;
  propName: string;
  value: string | number;
};

export const OptionBlock: React.FC<OptionBlockProps> = ({
  children,
  index,
  name,
  propName,
  value,
}) => {
  const hrNode = index !== 0 ? <hr /> : undefined;
  const propVal = value === undefined ? "{undefined}" : JSON.stringify(value);

  return (
    <Block key={name}>
      {hrNode}
      <Title as="h6" size={6}>
        {name}:{" "}
        <code>
          {propName}={propVal}
        </code>
      </Title>
      {children}
    </Block>
  );
};
