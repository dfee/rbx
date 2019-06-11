import React from "react";

// todo
export type TooltipProps = {
  text: React.ReactNode;
  children: React.ReactNode;
};

export const Tooltip = ({ children, text }: TooltipProps) => (
  <div>{children}</div>
);
