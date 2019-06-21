import React, { useState, useCallback, useEffect } from "react";

import { Button } from "src/elements/button/button";

import { PageLoader, PageLoaderProps } from "../page-loader";

export type SimplePageLoaderManagerProps = Omit<PageLoaderProps, "active"> & {
  children: React.ReactNode;
  button: React.ReactElement<React.ComponentProps<typeof Button>>;
};

export const SimplePageLoaderManager = ({
  button,
  ...rest
}: SimplePageLoaderManagerProps) => {
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => setActive(true), [setActive]);

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const timeout = setTimeout(() => setActive(false), 3000);
    return () => clearTimeout(timeout);
  }, [active, setActive]);

  const managedButton = React.cloneElement(button, {
    onClick: handleClick,
  });

  return (
    <>
      {managedButton}
      <PageLoader {...rest} active={active} />
    </>
  );
};
