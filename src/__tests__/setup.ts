import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import { JSDOM } from "jsdom";

// const jsdom = new JSDOM(
//   "<!doctype html><html id='xyz'><body><div></div></body></html>",
// );
// const { window } = jsdom;

// function copyProps(src: any, target: any) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }

// (global as any).window = window;
// (global as any).document = window.document;
// (global as any).navigator = {
//   userAgent: "node.js",
// };
// (global as any).requestAnimationFrame = (callback: any) =>
//   setTimeout(callback, 0);
// (global as any).cancelAnimationFrame = (id: NodeJS.Timeout) => clearTimeout(id);
// copyProps(window, global);

Enzyme.configure({
  adapter: new Adapter(),
});
