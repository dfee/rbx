import * as React from "react";

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
      primaryColor="light"
      primaryName="customize"
      secondaryColor={color}
      secondaryName={name}
      url="/architecture/customize"
    />
  );
};
