import React from "react";

import { Generic } from "src/base";
import { Table } from "src/elements";

import { PropDoc } from "./types";

export type TypeCellProps = {
  typeName: PropDoc["typeName"];
  typeTip: PropDoc["typeTip"];
};

export const TypeCell = ({ typeName, typeTip }: TypeCellProps) => (
  <Table.Cell>
    <Generic as="code" tooltip={typeTip} tooltipMultiline>
      {typeName}
    </Generic>
  </Table.Cell>
);
