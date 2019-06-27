import * as React from "react";

import { AsDoc, AsDocProps } from "./as-doc";
import { CustomizeFeature, CustomizeFeatureProps } from "./customize-feature";
import { DocFeature, DocFeatureProps } from "./doc-feature";
import { Feature } from "./feature";

export type ComponentFeaturesProps = AsDocProps &
  DocFeatureProps &
  CustomizeFeatureProps;

export const ComponentFeatures: React.FC<ComponentFeaturesProps> = ({
  asType,
  docPath,
  customize,
}) => (
  <Feature.Group>
    <AsDoc asType={asType} />
    <CustomizeFeature customize={customize} />
    <DocFeature docPath={docPath} />
  </Feature.Group>
);
