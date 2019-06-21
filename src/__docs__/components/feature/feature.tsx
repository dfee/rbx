import { Link } from "docz";
import React from "react";

import { Variables } from "src/base/helpers/variables";
import { Control, Tag } from "src/elements";

import { FeatureGroup } from "./feature-group";

export type FeatureProps = {
  primaryName: string;
  primaryColor: Variables["colors"];
  secondaryName: string;
  secondaryColor: Variables["colors"];
  url?: string;
};

export const Feature = Object.assign(
  ({
    primaryName,
    primaryColor,
    secondaryName,
    secondaryColor,
    url,
  }: FeatureProps) => {
    const tagGroupProps =
      // todo
      // eslint-disable-next-line no-nested-ternary
      url === undefined
        ? {}
        : /^\/[a-z]/.test(url) // Local path, e.g. '/somewhere'
        ? { as: Link, to: url }
        : {
            as: "a" as keyof JSX.IntrinsicElements,
            href: url,
            target: "_blank",
          };

    return (
      <Control>
        <Tag.Group gapless {...tagGroupProps}>
          <Tag color={primaryColor}>{primaryName}</Tag>
          <Tag color={secondaryColor}>{secondaryName}</Tag>
        </Tag.Group>
      </Control>
    );
  },
  { Group: FeatureGroup },
);
