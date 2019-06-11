import React from "react";

import { Table } from "src/elements";

export type NameCellProps = { name: string };

export const NameCell = ({ name }: NameCellProps) => (
  <Table.Cell>
    <code>{name}</code>
  </Table.Cell>
);
