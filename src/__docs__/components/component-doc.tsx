// tslint:disable:no-submodule-imports
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import React from "react";

import { ForwardRefAsExoticComponent } from "src/base/exotic";
import { Title } from "src/elements";

import { ComponentFeatures, ComponentFeaturesProps } from "./feature";
import {
  BaseSimplePropsTable,
  BaseSimplePropsTableProps,
  PropDoc,
} from "./simple-props-table";

export const asDoc: PropDoc = {
  description: (
    <span>
      the React Component or JSX Element (e.g. <code>"div"</code> or{" "}
      <code>span</code>) to render as
    </span>
  ),
  typeName: "ReactType",
};

export const refDoc: PropDoc = {
  description: (
    <span>
      a handle to the underlying <code>React Component</code> or{" "}
      <code>JSX Element</code>
    </span>
  ),
  typeName: "Ref",
};

export type BaseComponentDocProps = {
  asType: string;
  components: BaseSimplePropsTableProps["components"];
  customize?: ComponentFeaturesProps["customize"];
  docPath?: ComponentFeaturesProps["docPath"];
  name: string;
  props: BaseSimplePropsTableProps["props"];
};

export const BaseComponentDoc: React.FC<BaseComponentDocProps> = ({
  asType,
  components,
  customize,
  docPath,
  name,
  props,
}) => {
  const componentFeaturesProps = { asType, customize, docPath };

  return (
    <React.Fragment>
      <Title as="h4" size={4}>
        {name}
      </Title>
      <ComponentFeatures {...componentFeaturesProps} />
      <BaseSimplePropsTable components={components} props={props} />
    </React.Fragment>
  );
};

// tslint:disable-next-line:no-unsafe-any - mdx-tag
export const ComponentDoc = withMDXComponents(BaseComponentDoc);

export type ForwardRefAsExoticComponentDoc = {
  // tslint:disable-next-line:no-any
  component: ForwardRefAsExoticComponent<any, any>;
  components: BaseSimplePropsTableProps["components"];
  customize: BaseComponentDocProps["customize"];
  docPath?: ComponentFeaturesProps["docPath"];
  name: string;
  props: BaseSimplePropsTableProps["props"];
};

const BaseForwardRefAsExoticComponentDoc: React.FC<
  ForwardRefAsExoticComponentDoc
> = ({ component, components, customize, docPath, name, props }) => {
  if (
    component.defaultProps === undefined ||
    component.defaultProps.as === undefined
  ) {
    throw new Error("ForwardRefAsExpoticComponents have an `as` defaultProp");
  }
  const asType = component.defaultProps.as as React.ReactType;
  const asTypeString =
    typeof asType === "string"
      ? asType
      : asType.displayName !== undefined
      ? asType.displayName
      : JSON.stringify(asType);

  const extendedProps: BaseSimplePropsTableProps["props"] = {
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
    <BaseComponentDoc
      asType={asTypeString}
      components={components}
      customize={customize}
      docPath={docPath}
      name={name}
      props={extendedProps}
    />
  );
};

// tslint:disable-next-line:no-unsafe-any - mdx-tag
export const ForwardRefAsExoticComponentDoc = withMDXComponents(
  BaseForwardRefAsExoticComponentDoc,
);
