import React from "react";

import { Variables } from "../../../base/helpers/variables";

import { Feature } from "./feature";

export type DocFeatureProps = {
  docPath?: string;
};

export const DocFeature: React.FC<DocFeatureProps> = ({ docPath }) => {
  const isBulmaPath = docPath !== undefined ? !/^http.+/.test(docPath) : false;
  const isRemoteUrl = docPath !== undefined && !isBulmaPath;

  let url: string | undefined;
  let secondaryName = "n/a";
  let secondaryColor: Variables["colors"] = "dark";

  if (isBulmaPath) {
    url = `https://bulma.io/documentation${docPath}`;
    secondaryName = "Bulma";
    secondaryColor = "primary";
  } else if (isRemoteUrl) {
    url = docPath;
    secondaryName = "Third Party";
    secondaryColor = "info";
  }

  return (
    <Feature
      primaryColor="light"
      primaryName="docs"
      secondaryColor={secondaryColor}
      secondaryName={secondaryName}
      url={url}
    />
  );
};
