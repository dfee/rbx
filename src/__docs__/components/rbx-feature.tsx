import React from "react";

import { Media } from "src/components";
import { Image, Title } from "src/elements";
import { Column, ColumnProps } from "src/grid/columns/column";

export type RbxFeatureProps = {
  children: React.ReactNode;
  imageSrc: string;
  size?: ColumnProps["size"]; // false positive
  title: string;
  to: string;
};

export const RbxFeature = ({
  children,
  imageSrc,
  size: colSize,
  title,
  to,
}: RbxFeatureProps) => {
  const size = colSize !== undefined ? colSize : "half";

  return (
    <Column mobile={{ size: "full" }} size={size}>
      <Media>
        <Media.Item align="left" as="figure">
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
