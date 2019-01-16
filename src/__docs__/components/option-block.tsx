import React from "react";

import { Block, Title } from "src/elements";

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

export class OptionBlock extends React.Component<OptionBlockProps> {
  public render() {
    const { children, index, props } = this.props;

    const hrNode =
      index !== undefined && index !== 0 ? <hr style={hrStyle} /> : undefined;

    return (
      <Block>
        {hrNode}
        <Title as="h6" size={6}>
          {Object.keys(props).map(key => this.renderProp(key, props[key]))}
        </Title>
        {children}
      </Block>
    );
  }

  private readonly renderProp = (
    name: string,
    value: string | number | boolean,
  ) => {
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
  }
}
