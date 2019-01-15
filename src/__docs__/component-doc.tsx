// tslint:disable:no-submodule-imports
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import React from "react";

import { ForwardRefAsExoticComponent } from "src/base/exotic";
import { Title } from "src/elements";

import { ComponentFeatures, ComponentFeaturesProps } from "./feature";
import {
  BaseSimplePropsTable,
  BaseSimplePropsTableProps,
} from "./simple-props-table";

export type BaseComponentDocProps = {
  asType: string;
  components: BaseSimplePropsTableProps["components"];
  docPath?: ComponentFeaturesProps["docPath"];
  extendable?: ComponentFeaturesProps["extendable"];
  name: string;
  props: BaseSimplePropsTableProps["props"];
};

const BaseComponentDoc: React.FC<BaseComponentDocProps> = ({
  asType,
  components,
  docPath,
  extendable,
  name,
  props,
}) => {
  const componentFeaturesProps = { asType, docPath, extendable };

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
  docPath?: ComponentFeaturesProps["docPath"];
  extendable: BaseComponentDocProps["extendable"];
  components: BaseSimplePropsTableProps["components"];
  name: string;
  props: BaseSimplePropsTableProps["props"];
};

const BaseForwardRefAsExoticComponentDoc: React.FC<
  ForwardRefAsExoticComponentDoc
> = ({ component, components, docPath, extendable, name, props }) => {
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
    as: {
      description:
        'the React Component or JSX Element (e.g. "div" or "span") to render as',
      typeName: "ReactType",
    },
    ref: {
      description: "a handle to the underlying React Component or JSX Element",
      typeName: "React.RefObject",
    },
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
      docPath={docPath}
      components={components}
      extendable={extendable}
      name={name}
      props={extendedProps}
    />
  );
};

// tslint:disable-next-line:no-unsafe-any - mdx-tag
export const ForwardRefAsExoticComponentDoc = withMDXComponents(
  BaseForwardRefAsExoticComponentDoc,
);
