// tslint:disable:no-submodule-imports
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import { get } from "lodash/fp";
import React from "react";

import { HelpersProps } from "src/base";
import { Table } from "src/elements";

const lexSortObj = <T extends object>(obj: { [K: string]: T }) =>
  Object.keys(obj)
    .sort((a, b) => (a < b ? -1 : a === b ? 0 : 1))
    .map(key => ({ key, value: obj[key] }));

export type TooltipComponent = React.ComponentType<{
  text: React.ReactNode;
  children: React.ReactNode;
}>;

export type PropDoc = {
  description?: string;
  required?: boolean;
  typeName: string;
  typeTip?: string;
  defaultValue?: string;
};

export type WithMDXProps = {
  components: {
    // tslint:disable-next-line:no-any
    [key: string]: React.ComponentType<any>;
  };
};

export type BaseSimplePropsTableProps = {
  props?: Record<string, PropDoc>;
} & WithMDXProps;

export class BaseSimplePropsTable extends React.Component<
  BaseSimplePropsTableProps
> {
  public render() {
    const { props } = this.props;

    if (props === undefined) {
      return undefined;
    }

    const thDescription = this.hasDescription ? (
      <th style={{ width: "40%" }}>Description</th>
    ) : (
      undefined
    );

    return (
      <Table bordered narrow hoverable fullwidth>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            {thDescription}
          </tr>
        </thead>
        {this.renderBody()}
      </Table>
    );
  }

  private get hasDescription() {
    const { props } = this.props;

    if (props === undefined) {
      return false;
    }

    return Object.keys(props).some((name: string) => {
      const description = get(`${name}.description`, props);

      return Boolean(description) && Boolean(get("length", description));
    });
  }

  private readonly renderBody = () => {
    const { props } = this.props;

    if (props === undefined) {
      return undefined;
    }

    return (
      <tbody>
        {lexSortObj(props).map(({ key: name, value: propDoc }) =>
          this.renderRow(name, propDoc),
        )}
      </tbody>
    );
  }

  private readonly renderCellName = (name: string) => (
    <Table.Cell>
      <code>{name}</code>
    </Table.Cell>
  )

  private readonly renderCellRequired = (required: boolean | undefined) => {
    const props: {
      children: React.ReactNode;
      textColor: HelpersProps["textColor"];
    } = {
      children: required === true ? "true" : "false",
      textColor: required === true ? "danger" : "grey-light",
    };

    return <Table.Cell {...props} />;
  }

  private readonly renderCellType = (
    typeName: string,
    typeTip: string | undefined,
  ) => {
    const { components } = this.props;
    const Tooltip: TooltipComponent = components.tooltip;

    const typeNode =
      typeTip === undefined ? (
        typeName
      ) : (
        <Tooltip text={typeTip}>{typeName}</Tooltip>
      );

    return (
      <Table.Cell>
        <code>{typeNode}</code>
      </Table.Cell>
    );
  }

  private readonly renderCellDescription = (
    description: string | undefined,
  ) => {
    if (!this.hasDescription) {
      return undefined;
    } else if (description === undefined) {
      return <Table.Cell />;
    }

    return <Table.Cell>{description}</Table.Cell>;
  }

  private readonly renderCellDefaultValue = (
    defaultValue: PropDoc["defaultValue"],
  ) => {
    if (defaultValue === undefined) {
      return (
        <Table.Cell textColor="grey-light">
          <em>-</em>
        </Table.Cell>
      );
    }
    const stringDefaultValue =
      defaultValue === "''"
        ? "[Empty String]"
        : defaultValue.replace(/\'/g, "");

    return (
      <Table.Cell>
        <code>{stringDefaultValue}</code>
      </Table.Cell>
    );
  }

  private readonly renderRow = (name: string, propDoc: PropDoc) => {
    return (
      <Table.Row key={name}>
        {this.renderCellName(name)}
        {this.renderCellType(propDoc.typeName, propDoc.typeTip)}
        {this.renderCellRequired(propDoc.required)}
        {this.renderCellDefaultValue(propDoc.defaultValue)}
        {this.renderCellDescription(propDoc.description)}
      </Table.Row>
    );
  }
}

// tslint:disable-next-line: no-unsafe-any
export const SimplePropsTable = withMDXComponents(BaseSimplePropsTable);
