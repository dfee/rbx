import { classNames } from "..";

describe("Helper proptypes", () => {
  test("Should have paddingless and clearfix classes", () => {
    expect(
      classNames({
        clearfix: true,
        paddingless: true,
      }),
    ).toMatchSnapshot();
  });

  test("Should have text helpers", () => {
    expect(
      classNames({
        italic: true,
        textAlignment: "centered",
        textColor: "success",
        textTransform: "uppercase",
        textWeight: "bold",
      }),
    ).toMatchSnapshot();
  });

  test("Should have responsive modifier flex-tablet-only and block-widescreen", () => {
    expect(
      classNames({
        responsive: {
          tablet: {
            display: {
              only: true,
              value: "flex",
            },
          },
          widescreen: {
            display: {
              value: "block",
            },
          },
        },
      }),
    ).toMatchSnapshot();
  });

  test("Should have hidden modifier tablet-only and widescreen", () => {
    expect(
      classNames({
        responsive: {
          tablet: {
            hide: {
              only: true,
              value: true,
            },
          },
          widescreen: {
            hide: {
              value: true,
            },
          },
        },
      }),
    ).toMatchSnapshot();
  });

  test("Should have alignment responsive modifiers", () => {
    expect(
      classNames({
        responsive: {
          tablet: {
            textAlignment: {
              only: true,
              value: "centered",
            },
          },
          widescreen: {
            textAlignment: {
              value: "left",
            },
          },
        },
      }),
    ).toMatchSnapshot();
  });

  test("Should have text color success", () => {
    expect(
      classNames({
        textColor: "success",
      }),
    ).toMatchSnapshot();
  });

  test("Should have background color success", () => {
    expect(
      classNames({
        backgroundColor: "success",
      }),
    ).toMatchSnapshot();
  });
});
