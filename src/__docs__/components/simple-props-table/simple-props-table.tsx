// tslint:disable:no-submodule-imports
import React from "react";

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
      <tbody>
        {lexSortObj(props).map(({ key: name, value: propDoc }) => (
          <SimplePropsTableRow
            key={name}
            hasDescription={hasDescription}
            name={name}
            propDoc={propDoc}
          />
        ))}
      </tbody>
    </Table>
  );
};
