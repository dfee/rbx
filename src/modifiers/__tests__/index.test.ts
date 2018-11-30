import { modify } from "..";
import { modify as colorModify } from "../color";
import { modify as helpersModify } from "../helpers";
// import { modify as responsiveModify } from "../responsives";
import { modify as typographyModify } from "../typography";

describe("Root modify", () => {
  test("should work on empty props", () => {
    expect(modify({})).toStrictEqual({});
  });

  test("should run all sub-modifiers", () => {
    expect(
      modify({
        backgroundColor: "info", // color
        clearfix: true, // helpers
        italic: true, // typography
        responsive: { textSize: 1 }, // responsive // todo!
      }),
    ).toMatchSnapshot();
  });

  test("should not clear out unknown props", () => {
    expect(modify({ unknowwn: true })).toMatchSnapshot();
  });
});

describe("Color modify", () => {
  test("should have class names applied", () => {
    expect(
      colorModify({
        backgroundColor: "info",
        textColor: "success",
      }),
    ).toMatchSnapshot();
  });
});

describe("Helpers modify", () => {
  test("should have class names applied", () => {
    expect(
      helpersModify({
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
// describe("Responsive modify", () => {
//   test("should have class names applied", () => {
//     expect(
//       responsiveModify({
//         responsive: []
//       }),
//     ).toMatchSnapshot();
//   });
// });

describe("Typography modify", () => {
  test("should have class names applied", () => {
    expect(
      typographyModify({
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
