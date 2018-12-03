import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type ContentOrderedListItemProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLLIElement>
>;

export const ContentOrderedListItem = React.forwardRef<
  "ol",
  ContentOrderedListItemProps
>((props, ref) => {
  const transformed = transformModifiers(props);
  return React.createElement("li", { ref, ...transformed });
});
