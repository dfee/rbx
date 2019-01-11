// tslint:disable:no-submodule-imports
// tslint:disable:no-reserved-keywords
// tslint:disable:no-any
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword
// tslint:disable:no-unsafe-any

import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import capitalize from "capitalize";
import { get } from "lodash/fp";
import React, { ComponentType, CSSProperties, Fragment, SFC } from "react";

export interface StylesMap {
  [s: string]: CSSProperties;
}

const styles: StylesMap = {
  thead: {
    textAlign: "left",
  },
};

export type TooltipComponent = React.ComponentType<{
  text: React.ReactNode;
  children: React.ReactNode;
}>;

export type SimplePropsTable = {
  props?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      typeName: string;
      typeTip?: string;
      defaultValue?: string;
    }
  >;
  components: {
    [key: string]: ComponentType<any>;
  };
};

const BaseSimplePropsTable: SFC<SimplePropsTable> = ({ components, props }) => {
  if (props === undefined) {
    return null;
  }

  const hasDescription = Object.keys(props).some((name: string) => {
    const description = get(`${name}.description`, props);

    return Boolean(description) && Boolean(get("length", description));
  });

  const Table = components.table || "table";
  const Thead = components.thead || "thead";
  const Tr = components.tr || "tr";
  const Th = components.th || "th";
  const Tbody = components.tbody || "tbody";
  const Td = components.td || "td";
  const Tooltip: TooltipComponent = components.tooltip;

  return (
    <Fragment>
      <Table className="PropsTable">
        <Thead style={styles.thead}>
          <Tr>
            <Th className="PropsTable--property">Property</Th>
            <Th className="PropsTable--type">Type</Th>
            <Th className="PropsTable--required">Required</Th>
            <Th className="PropsTable--default">Default</Th>
            {hasDescription && (
              <Th width="40%" className="PropsTable--description">
                Description
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {props &&
            Object.keys(props).map((name: string) => {
              const prop = props[name];

              if (!prop.typeName) {
                return null;
              }

              return (
                <Tr key={name}>
                  <Td>{name}</Td>
                  <Td>
                    {prop.typeTip ? (
                      <Tooltip text={prop.typeTip}>
                        {capitalize(prop.typeName)}
                      </Tooltip>
                    ) : (
                      capitalize(prop.typeName)
                    )}
                  </Td>
                  <Td>{prop.required ? String(prop.required) : "false"}</Td>
                  {!prop.defaultValue ? (
                    <Td>
                      <em>-</em>
                    </Td>
                  ) : (
                    <Td>
                      {prop.defaultValue === "''" ? (
                        <em>[Empty String]</em>
                      ) : (
                        prop.defaultValue.replace(/\'/g, "")
                      )}
                    </Td>
                  )}
                  {hasDescription && (
                    <Td>{prop.description && prop.description}</Td>
                  )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Fragment>
  );
};

export const SimplePropsTable = withMDXComponents(BaseSimplePropsTable);
