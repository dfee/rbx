import React from "react";
import ReactDOM from "react-dom";

export type FrameRenderProps = {
  document?: Document;
};

export type RenderFunction = (props: FrameRenderProps) => React.ReactNode;

export type FrameProps = {
  children: RenderFunction | React.ReactNode;
  forceHeight?: boolean;
  style?: React.CSSProperties;
  updateHeightDelay?: number;
};

export class Frame extends React.Component<FrameProps> {
  public static defaultProps = {
    forceHeight: false,
    updateHeightDelay: 200,
  };

  private readonly ref = React.createRef<HTMLIFrameElement>();
  private updateHeightEnabled = false;
  private updateHeightTimeout: NodeJS.Timeout | undefined;
  private iframeRoot: HTMLElement | undefined;

  public componentDidMount() {
    if (this.ref.current !== null) {
      this.ref.current.addEventListener("load", this.handleLoad);
    }
  }

  public componentWillUnmount() {
    if (this.ref.current !== null) {
      this.ref.current.removeEventListener("load", this.handleLoad);
      if (this.updateHeightEnabled) {
        this.updateHeightEnabled = false;
      }
      if (this.updateHeightTimeout !== undefined) {
        clearTimeout(this.updateHeightTimeout);
      }
    }
  }

  public render() {
    const { children } = this.props;

    return (
      <iframe
        ref={this.ref}
        sandbox="allow-same-origin"
        srcDoc={"<!DOCTYPE html>"}
        style={{
          height: "0px",
          width: "100%",
          ...this.props.style,
        }}
      >
        {this.iframeRoot !== undefined &&
        this.ref.current !== null &&
        this.ref.current.contentDocument !== null
          ? typeof children === "function"
            ? ReactDOM.createPortal(
                (children as RenderFunction)({
                  document: this.ref.current.contentDocument,
                }),
                this.iframeRoot,
              )
            : ReactDOM.createPortal(children, this.iframeRoot)
          : undefined}
      </iframe>
    );
  }

  private readonly cloneStyles = () => {
    if (
      this.ref.current !== null &&
      this.ref.current.contentDocument !== null
    ) {
      const links = Array.from(document.getElementsByTagName("link"));
      for (const link of links) {
        if (link.rel === "stylesheet") {
          this.ref.current.contentDocument.head.appendChild(
            link.cloneNode(true),
          );
        }
      }

      const styles = Array.from(document.head.getElementsByTagName("style"));
      for (const style of styles) {
        this.ref.current.contentDocument.head.appendChild(
          style.cloneNode(true),
        );
      }
    }
  }

  private readonly handleLoad = () => {
    if (
      this.ref.current !== null &&
      this.ref.current.contentDocument !== null &&
      this.ref.current.contentDocument.body !== null
    ) {
      this.iframeRoot = this.ref.current.contentDocument.body;
      this.cloneStyles();
      this.forceUpdate();
      this.doUpdateHeight();
    }
  }

  private readonly doUpdateHeight = () => {
    if (
      this.props.forceHeight !== true &&
      this.ref.current !== null &&
      this.ref.current.contentDocument !== null &&
      this.ref.current.contentDocument.body !== null
    ) {
      this.ref.current.style.height = `${
        this.ref.current.contentDocument.body.scrollHeight
      }px`;
    }
    this.updateHeight();
  }

  private readonly updateHeight = () => {
    const { updateHeightDelay } = this.props;
    if (updateHeightDelay !== 0 && updateHeightDelay !== undefined) {
      this.updateHeightEnabled = true;
      this.updateHeightTimeout = setTimeout(
        this.doUpdateHeight,
        updateHeightDelay,
      );
    } else {
      this.updateHeightEnabled = false;
    }
  }
}
