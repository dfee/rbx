import React from "react";

import { Feature } from "./feature";

export type CustomizeFeatureProps = {
  customize?: boolean;
};

export const CustomizeFeature: React.FC<CustomizeFeatureProps> = ({
  customize,
}) => {
  const name = customize === true ? "yes" : "no";
  const color = customize === true ? "success" : "danger";

  return (
    <Feature
      primaryName="customize"
      primaryColor="light"
      secondaryName={name}
      secondaryColor={color}
      url="/architecture/customize"
    />
  );
};
