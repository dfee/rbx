import * as React from "react";

import { Table } from "src/elements";

import { PropDoc } from "./types";
import { lexSortObj } from "./utils";
import { SimplePropsTableRow } from "./simple-props-table-row";

export type SimplePropsTableProps = {
  props?: Record<string, PropDoc>;
};

export const SimplePropsTable = ({ props }: SimplePropsTableProps) => {
  if (props === undefined) {
    return null;
  }

  const hasDescription = Object.keys(props).some(
    (name: string) => props[name].description !== undefined,
  );

  const thDescription = hasDescription ? (
    <Table.Heading style={{ width: "40%" }}>Description</Table.Heading>
  ) : (
    undefined
  );

  return (
    <Table bordered fullwidth hoverable narrow>
      <Table.Head>
        <Table.Row>
          <Table.Heading>Property</Table.Heading>
          <Table.Heading>Type</Table.Heading>
          <Table.Heading>Required</Table.Heading>
          <Table.Heading>Default</Table.Heading>
          {thDescription}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {lexSortObj(props).map(({ key: name, value: propDoc }) => (
          <SimplePropsTableRow
            key={name}
            hasDescription={hasDescription}
            name={name}
            propDoc={propDoc}
          />
        ))}
      </Table.Body>
    </Table>
  );
};
