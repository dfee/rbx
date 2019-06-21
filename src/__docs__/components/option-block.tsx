import React from "react";

import { Block, Title } from "src/elements";

import { OptionBlockProp } from "./option-block-prop";

const hrStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  borderColor: "#ddd",
  borderStyle: "dashed",
  borderWidth: "1px 0 0 0",
};

export type OptionBlockProps = {
  index?: number;
  children: React.ReactNode;
  props: Record<string, string | number | boolean>;
};

export const OptionBlock = ({ children, index, props }: OptionBlockProps) => {
  const hrNode =
    index !== undefined && index !== 0 ? <hr style={hrStyle} /> : undefined;

  return (
    <Block>
      {hrNode}
      <Title as="h6" size={6}>
        {Object.keys(props).map(key => (
          <OptionBlockProp key={key} name={key} value={props[key]} />
        ))}
      </Title>
      {children}
    </Block>
  );
};
