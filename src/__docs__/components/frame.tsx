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

  private readonly _ref = React.createRef<HTMLIFrameElement>();
  private _updateHeightEnabled = false;
  private _updateHeightTimeout: NodeJS.Timeout | undefined;
  private _iframeRoot: HTMLElement | undefined;

  public componentDidMount() {
    if (this._ref.current !== null) {
      this._ref.current.addEventListener("load", this._handleLoad);
    }
  }

  public componentWillUnmount() {
    if (this._ref.current !== null) {
      this._ref.current.removeEventListener("load", this._handleLoad);
      if (this._updateHeightEnabled) {
        this._updateHeightEnabled = false;
      }
      if (this._updateHeightTimeout !== undefined) {
        clearTimeout(this._updateHeightTimeout);
      }
    }
  }

  private readonly _cloneStyles = () => {
    if (
      this._ref.current !== null &&
      this._ref.current.contentDocument !== null
    ) {
      const links = Array.from(document.getElementsByTagName("link"));
      for (const link of links) {
        if (link.rel === "stylesheet") {
          this._ref.current.contentDocument.head.appendChild(
            link.cloneNode(true),
          );
        }
      }

      const styles = Array.from(document.head.getElementsByTagName("style"));
      for (const style of styles) {
        this._ref.current.contentDocument.head.appendChild(
          style.cloneNode(true),
        );
      }
    }
  };

  private readonly _handleLoad = () => {
    if (
      this._ref.current !== null &&
      this._ref.current.contentDocument !== null &&
      this._ref.current.contentDocument.body !== null
    ) {
      this._iframeRoot = this._ref.current.contentDocument.body;
      this._cloneStyles();
      this.forceUpdate();
      this._doUpdateHeight();
    }
  };

  private readonly _doUpdateHeight = () => {
    const { forceHeight } = this.props;
    if (
      forceHeight !== true &&
      this._ref.current !== null &&
      this._ref.current.contentDocument !== null &&
      this._ref.current.contentDocument.body !== null
    ) {
      this._ref.current.style.height = `${this._ref.current.contentDocument.body.scrollHeight}px`;
    }
    this._updateHeight();
  };

  private readonly _updateHeight = () => {
    const { updateHeightDelay } = this.props;
    if (updateHeightDelay !== 0 && updateHeightDelay !== undefined) {
      this._updateHeightEnabled = true;
      this._updateHeightTimeout = setTimeout(
        this._doUpdateHeight,
        updateHeightDelay,
      );
    } else {
      this._updateHeightEnabled = false;
    }
  };

  public render() {
    const { children, style } = this.props;

    let node: React.ReactNode = null;
    if (
      this._iframeRoot !== undefined &&
      this._ref.current !== null &&
      this._ref.current.contentDocument !== null
    ) {
      if (typeof children === "function") {
        node = ReactDOM.createPortal(
          (children as RenderFunction)({
            document: this._ref.current.contentDocument,
          }),
          this._iframeRoot,
        );
      } else {
        node = ReactDOM.createPortal(children, this._iframeRoot);
      }
    }

    return (
      <iframe
        ref={this._ref}
        sandbox="allow-same-origin"
        srcDoc={"<!DOCTYPE html>"}
        style={{
          height: "0px",
          width: "100%",
          ...style,
        }}
        title="docs iframe"
      >
        {node}
      </iframe>
    );
  }
}
