import React from "react";

import { Media } from "src/components";
import { Image, Title } from "src/elements";
import { Column, ColumnProps } from "src/grid/columns/column";

export const RbxFeature: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  title: string;
  to: string;
  size?: ColumnProps["size"];
}> = ({ children, imageSrc, size: colSize, title, to }) => {
  const size = colSize !== undefined ? colSize : "half";

  return (
    <Column size={size} mobile={{ size: "full" }}>
      <Media>
        <Media.Item as="figure" align="left">
          <Image.Container as="a" href={to} size={64} target="_blank">
            <Image src={imageSrc} />
          </Image.Container>
        </Media.Item>

        <Media.Item align="content">
          <Title
            as="a"
            href={to}
            size={5}
            style={{ marginBottom: "5px" }}
            target="_blank"
          >
            {title}
          </Title>
          {children}
        </Media.Item>
      </Media>
    </Column>
  );
};
