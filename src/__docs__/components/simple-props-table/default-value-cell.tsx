import React from "react";

import { Table } from "src/elements";

import { PropDoc } from "./types";

export type DefaultValueCellProps = {
  defaultValue: PropDoc["defaultValue"];
};

export const DefaultValueCell = ({ defaultValue }: DefaultValueCellProps) => {
  if (defaultValue === undefined) {
    return (
      <Table.Cell textColor="grey-light">
        <em>-</em>
      </Table.Cell>
    );
  }
  const stringDefaultValue =
    defaultValue === "''" ? "[Empty String]" : defaultValue.replace(/'/g, "");

  return (
    <Table.Cell>
      <code>{stringDefaultValue}</code>
    </Table.Cell>
  );
};
