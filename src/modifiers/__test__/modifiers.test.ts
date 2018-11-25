import modifiers from "..";

describe("Helper proptypes", () => {
  test("Should have paddingless and clearfix classes", () => {
    expect(
      modifiers.classNames({
        clearfix: true,
        paddingless: true,
      }),
    ).toMatchSnapshot();
  });

  test("Should have text helpers", () => {
    expect(
      modifiers.classNames({
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
      modifiers.classNames({
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
      modifiers.classNames({
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
      modifiers.classNames({
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
      modifiers.classNames({
        textColor: "success",
      }),
    ).toMatchSnapshot();
  });

  test("Should have background color success", () => {
    expect(
      modifiers.classNames({
        backgroundColor: "success",
      }),
    ).toMatchSnapshot();
  });
});
