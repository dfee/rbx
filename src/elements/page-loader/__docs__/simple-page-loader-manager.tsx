import React from "react";

import { Button } from "src/elements/button/button";
import { PageLoader, PageLoaderProps } from "../page-loader";

export type SimplePageLoaderManagerProps = Omit<PageLoaderProps, "active"> & {
  children: React.ReactNode;
  button: React.ReactElement<React.ComponentProps<typeof Button>>;
};
export type SimplePageLoaderManagerState = { active: boolean };

export class SimplePageLoaderManager extends React.Component<
  SimplePageLoaderManagerProps,
  SimplePageLoaderManagerState
> {
  public readonly state: SimplePageLoaderManagerState = { active: false };

  public render() {
    const { button, ...rest } = this.props;

    const managedButton = React.cloneElement(button, {
      onClick: this.handleClick,
    });

    return (
      <React.Fragment>
        {managedButton}
        <PageLoader {...rest} active={this.state.active} />
      </React.Fragment>
    );
  }

  private readonly handleClick = () => {
    this.setState({ active: true }, () => {
      setTimeout(() => {
        this.setState({ active: false });
      }, 3000);
    });
  };
}
