import React from "react";

import { Field } from "src/elements";

export type FeatureGroupProps = {
  children: React.ReactNode;
};

export const FeatureGroup: React.FC<FeatureGroupProps> = ({ children }) => (
  <Field kind="group" children={children} />
);
