import * as React from "react";

import { Feature } from "./feature";

export type AsDocProps = {
  asType: string;
};

export const AsDoc: React.FC<AsDocProps> = ({ asType }) => (
  <Feature
    primaryColor="light"
    primaryName="as"
    secondaryColor="warning"
    secondaryName={asType}
    url="/architecture/inversion-of-control"
  />
);
