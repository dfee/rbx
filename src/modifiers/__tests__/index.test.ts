import { transformModifiers } from "..";
import { transformColorModifiers } from "../color";
import { transformHelpersModifiers } from "../helpers";
// import { transformResponsiveModifiers } from "../responsive";
import { transformTypographyModifiers } from "../typography";

describe("Transform modifiers", () => {
  test("should work on empty props", () => {
    expect(transformModifiers({})).toStrictEqual({});
  });

  test("should run all sub-modifiers", () => {
    expect(
      transformModifiers({
        backgroundColor: "info", // color
        clearfix: true, // helpers
        italic: true, // typography
        responsive: { textSize: 1 }, // responsive // todo!
      }),
    ).toMatchSnapshot();
  });

  test("should not clear out unknown props", () => {
    expect(transformModifiers({ unknowwn: true })).toMatchSnapshot();
  });
});

describe("Transform color modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformColorModifiers({
        backgroundColor: "info",
        textColor: "success",
      }),
    ).toMatchSnapshot();
  });
});

describe("Transform helpers modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformHelpersModifiers({
        clearfix: true,
        clipped: true,
        hidden: true,
        invisible: true,
        marginless: true,
        overlay: true,
        paddingless: true,
        pull: "right",
        radiusless: true,
        shadowless: true,
        unselectable: true,
      }),
    ).toMatchSnapshot();
  });
});

// todo
// describe("Transform responsive modifiers", () => {
//   test("should have class names applied", () => {
//     expect(
//       responsiveModify({
//         responsive: []
//       }),
//     ).toMatchSnapshot();
//   });
// });

describe("Transform typography modifiers", () => {
  test("should have class names applied", () => {
    expect(
      transformTypographyModifiers({
        italic: true,
        textAlignment: "centered",
        textSize: 1,
        textTransform: "capitalized",
        textWeight: "light",
      }),
    ).toMatchSnapshot();
  });
});

// todo

// test("Should have paddingless and clearfix classes", () => {
//   expect(
//     classNames({
//       clearfix: true,
//       paddingless: true,
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have text helpers", () => {
//   expect(
//     classNames({
//       italic: true,
//       textAlignment: "centered",
//       textColor: "success",
//       textTransform: "uppercase",
//       textWeight: "bold",
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have responsive modifier flex-tablet-only and block-widescreen", () => {
//   expect(
//     classNames({
//       responsive: {
//         tablet: {
//           display: {
//             only: true,
//             value: "flex",
//           },
//         },
//         widescreen: {
//           display: {
//             value: "block",
//           },
//         },
//       },
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have hidden modifier tablet-only and widescreen", () => {
//   expect(
//     classNames({
//       responsive: {
//         tablet: {
//           hide: {
//             only: true,
//             value: true,
//           },
//         },
//         widescreen: {
//           hide: {
//             value: true,
//           },
//         },
//       },
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have alignment responsive modifiers", () => {
//   expect(
//     classNames({
//       responsive: {
//         tablet: {
//           textAlignment: {
//             only: true,
//             value: "centered",
//           },
//         },
//         widescreen: {
//           textAlignment: {
//             value: "left",
//           },
//         },
//       },
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have text color success", () => {
//   expect(
//     classNames({
//       textColor: "success",
//     }),
//   ).toMatchSnapshot();
// });

// test("Should have background color success", () => {
//   expect(
//     classNames({
//       backgroundColor: "success",
//     }),
//   ).toMatchSnapshot();
// });
