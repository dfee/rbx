import React from "react";

import { Table } from "src/elements";
import { Tooltip } from "./tooltip";

import { PropDoc } from "./types";

export type TypeCellProps = {
  typeName: PropDoc["typeName"];
  typeTip: PropDoc["typeTip"];
};

export const TypeCell = ({ typeName, typeTip }: TypeCellProps) => {
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
};
