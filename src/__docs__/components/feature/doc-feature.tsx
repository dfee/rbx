import React from "react";

import { Feature } from "./feature";

export type DocFeatureProps = {
  docPath?: string;
};

export const DocFeature: React.FC<DocFeatureProps> = ({ docPath }) => {
  const url =
    docPath !== undefined
      ? `https://bulma.io/documentation${docPath}`
      : undefined;
  const secondaryName = docPath !== undefined ? "Bulma" : "n/a";
  const secondaryColor = docPath !== undefined ? "primary" : "dark";

  return (
    <Feature
      primaryName="docs"
      primaryColor="light"
      secondaryName={secondaryName}
      secondaryColor={secondaryColor}
      url={url}
    />
  );
};
