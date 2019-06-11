import React from "react";

import { Table } from "src/elements";

import { DefaultValueCell } from "./default-value-cell";
import { DescriptionCell } from "./description-cell";
import { NameCell } from "./name-cell";
import { PropDoc } from "./types";
import { RequiredCell } from "./required-cell";
import { TypeCell } from "./type-cell";

export type SimplePropsTableRowProps = {
  hasDescription?: boolean;
  name: string;
  propDoc: PropDoc;
};

export const SimplePropsTableRow = ({
  hasDescription,
  name,
  propDoc,
}: SimplePropsTableRowProps) => (
  <Table.Row key={name}>
    <NameCell name={name} />
    <TypeCell typeName={propDoc.typeName} typeTip={propDoc.typeTip} />
    <RequiredCell required={propDoc.required} />
    <DefaultValueCell defaultValue={propDoc.defaultValue} />
    {hasDescription && <DescriptionCell description={propDoc.description} />}
  </Table.Row>
);
