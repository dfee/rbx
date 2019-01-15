// tslint:disable:no-submodule-imports
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import { get } from "lodash/fp";
import React from "react";

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
      <Table bordered narrow hoverable>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            {thDescription}
          </tr>
        </thead>
        {this.renderTbody()}
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

  private readonly renderTbody = () => {
    const { props } = this.props;

    if (props === undefined) {
      return undefined;
    }

    return (
      <tbody>
        {lexSortObj(props).map(({ key: name, value: propDoc }) =>
          this.renderTr(name, propDoc),
        )}
      </tbody>
    );
  }

  private readonly renderTr = (name: string, propDoc: PropDoc) => {
    const { components } = this.props;
    const Tooltip: TooltipComponent = components.tooltip;

    const tdDescription = this.hasDescription ? (
      propDoc.description !== undefined ? (
        <td>{propDoc.description}</td>
      ) : (
        <td />
      )
    ) : (
      undefined
    );

    return (
      <tr key={name}>
        <td>
          <code>{name}</code>
        </td>
        <td>
          {propDoc.typeTip !== undefined ? (
            <Tooltip text={propDoc.typeTip}>{propDoc.typeName}</Tooltip>
          ) : (
            propDoc.typeName
          )}
        </td>
        <td>{propDoc.required === true ? "true" : "false"}</td>
        {propDoc.defaultValue === undefined ? (
          <td>
            <em>-</em>
          </td>
        ) : (
          <td>
            {propDoc.defaultValue === "''" ? (
              <em>[Empty String]</em>
            ) : (
              <code>{propDoc.defaultValue.replace(/\'/g, "")}</code>
            )}
          </td>
        )}
        {tdDescription}
      </tr>
    );
  }
}

// tslint:disable-next-line: no-unsafe-any
export const SimplePropsTable = withMDXComponents(BaseSimplePropsTable);
