import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";
import { noop } from "@/utils";

export type PaginationModifierProps = Partial<{
  autoHide: boolean;
  /** Current page */
  current: number;
  /** Amount of pages to display at the left and right of the current
   * (if delta 2 and current page is 3, the paginator will display pages from
   * 1 to 5)
   */
  delta: number;
  /** Text of the Next button */
  next: React.ReactNode;
  onChange: (page: number) => void;
  /** Text of the Previous button */
  previous: React.ReactNode;
  showPrevNext: boolean;
  /** Total pages in total */
  total: number;
}>;

export type PaginationProps = Prefer<
  ModifierProps & PaginationModifierProps,
  React.HTMLAttributes<HTMLElement>
>;

type PaginationControllerProps = PaginationProps & {
  innerRef: React.Ref<HTMLElement>;
};

class PaginationController extends React.PureComponent<
  PaginationControllerProps
> {
  public static defaultProps = {
    autoHide: true,
    current: 1,
    delta: 1,
    next: "Next",
    onChange: noop,
    previous: "Previous",
    showPrevNext: true,
    total: 1,
  };

  public goToPage = (page: number) => (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const { onChange } = this.props;
    onChange!(page);
  }

  public firstPage = (current: number, total: number) => {
    if (current === 1) {
      return 1;
    }
    const page = current - this.props.delta! * (current === total ? 2 : 1);
    return page <= 0 ? 1 : page;
  }

  public lastPage = (current: number, total: number) => {
    if (current === total) {
      return total;
    }
    const page = current + this.props.delta! * (current === 1 ? 2 : 1);
    return page > total ? total : page;
  }

  public render() {
    const {
      innerRef,
      current,
      total,
      next,
      previous,
      showPrevNext,
      delta,
      autoHide,
      className,
      onChange,
      ...props
    } = this.props;
    if (total! <= 1 && autoHide) {
      return null;
    }

    if (current! > total!) {
      return null;
    }

    const firstPage = this.firstPage(current!, total!);
    const lastPage = this.lastPage(current!, total!);

    return (
      <Generic<"nav">
        {...props}
        aria-label="pagination"
        as="nav"
        className={cx("pagination", className)}
        ref={innerRef}
      >
        {showPrevNext && (
          <React.Fragment>
            <a
              role="button"
              tabIndex={0}
              onClick={current === 1 ? undefined : this.goToPage(current! - 1)}
              className="pagination-previous"
              title="This is the first page"
            >
              {previous}
            </a>
            <a
              role="button"
              tabIndex={0}
              onClick={
                current === total ? undefined : this.goToPage(current! + 1)
              }
              className="pagination-next"
            >
              {next}
            </a>
          </React.Fragment>
        )}
        {delta! > 0 && (
          <React.Fragment>
            <ul className="pagination-list">
              {Array(lastPage - firstPage + 1)
                .fill(0)
                .map((_, i) => (
                  <li key={i + firstPage}>
                    <a
                      role="button"
                      tabIndex={0}
                      className={cx("pagination-link", {
                        "is-current": current === i + firstPage,
                      })}
                      onClick={
                        current === firstPage + i
                          ? undefined
                          : this.goToPage(firstPage + i)
                      }
                      aria-label={`Page ${i + firstPage}`}
                      aria-current="page"
                    >
                      {i + firstPage}
                    </a>
                  </li>
                ))}
            </ul>
          </React.Fragment>
        )}
      </Generic>
    );
  }
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (props, ref) => <PaginationController innerRef={ref} {...props} />,
);
