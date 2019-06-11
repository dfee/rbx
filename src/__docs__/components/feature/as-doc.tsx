import React from "react";

import { Feature } from "./feature";

export type AsDocProps = {
  asType: string;
};

export const AsDoc: React.FC<AsDocProps> = ({ asType }) => (
  <Feature
    primaryName="as"
    primaryColor="light"
    secondaryName={asType}
    secondaryColor="warning"
    url="/architecture/inversion-of-control"
  />
);
