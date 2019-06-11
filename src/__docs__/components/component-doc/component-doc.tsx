// tslint:disable:no-submodule-imports
import React from "react";

import { Title } from "src/elements";

import {
  ComponentFeatures,
  ComponentFeaturesProps,
} from "../feature/component-features";
import {
  SimplePropsTable,
  SimplePropsTableProps,
} from "../simple-props-table/simple-props-table";

export type ComponentDocProps = {
  asType: string;
  customize?: ComponentFeaturesProps["customize"];
  docPath?: ComponentFeaturesProps["docPath"];
  name: string;
  props: SimplePropsTableProps["props"];
};

export const ComponentDoc = ({
  asType,
  customize,
  docPath,
  name,
  props,
}: ComponentDocProps) => {
  const componentFeaturesProps = { asType, customize, docPath };

  return (
    <React.Fragment>
      <Title as="h4" size={4}>
        {name}
      </Title>
      <ComponentFeatures {...componentFeaturesProps} />
      <SimplePropsTable props={props} />
    </React.Fragment>
  );
};
