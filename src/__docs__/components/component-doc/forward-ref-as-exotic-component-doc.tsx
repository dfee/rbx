// tslint:disable:no-submodule-imports
import React from "react";

import { ForwardRefAsExoticComponent } from "src/base/exotic";

import { ComponentFeaturesProps } from "../feature/component-features";
import { SimplePropsTableProps } from "../simple-props-table/simple-props-table";
import { ComponentDoc, ComponentDocProps } from "./component-doc";
import { asDoc } from "./as-doc";
import { refDoc } from "./ref-doc";

export type ForwardRefAsExoticComponentDocProps = {
  // tslint:disable-next-line:no-any
  component: ForwardRefAsExoticComponent<any, any>;
  customize: ComponentDocProps["customize"];
  docPath?: ComponentFeaturesProps["docPath"];
  props: SimplePropsTableProps["props"];
};

export const ForwardRefAsExoticComponentDoc = ({
  component,
  customize,
  docPath,
  props,
}: ForwardRefAsExoticComponentDocProps) => {
  const asType = component.defaultProps.as as React.ReactType;
  const asTypeString =
    typeof asType === "string"
      ? asType
      : asType.displayName !== undefined
      ? asType.displayName
      : JSON.stringify(asType);

  const extendedProps: SimplePropsTableProps["props"] = {
    as: asDoc,
    ref: refDoc,
    ...props,
  };

  for (const propName of Object.keys(extendedProps)) {
    const defaultValue = component.defaultProps[propName];
    if (defaultValue !== undefined) {
      extendedProps[propName].defaultValue = JSON.stringify(defaultValue);
    }
  }

  return (
    <ComponentDoc
      asType={asTypeString}
      customize={customize}
      docPath={docPath}
      name={component.displayName}
      props={extendedProps}
    />
  );
};
