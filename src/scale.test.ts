import { scale } from "./scale";

describe("scale", () => {
  it("calculates width and height correctly", () => {
    const { width, height } = scale({
      height: 125,
      width: 200,
      maxWidth: 800,
      maxHeight: 800,
    });

    expect(width).toBe(800);
    expect(height).toBe(500);
  });

  it("calculates width and height correctly (2)", () => {
    const { width, height } = scale({
      width: 225,
      height: 125,
      maxWidth: 100,
      maxHeight: 100,
    });

    expect(width).toBe(100);
    expect(height).toBe(55);
  });

  it("calculates width and height correctly (3)", () => {
    const { width, height } = scale({
      width: 125,
      height: 225,
      maxWidth: 100,
      maxHeight: 100,
    });

    expect(width).toBe(55);
    expect(height).toBe(100);
  });

  describe("landscapes", () => {
    test("scales down the dimensions when just the maxWidth is passed", () => {
      expect(scale({ width: 800, height: 600, maxWidth: 400 })).toStrictEqual({
        width: 400,
        height: 300,
        paddingBottom: "75%",
        scale: 0.5,
      });
    });

    test("scales down the dimensions when just the maxHeight is passed", () => {
      expect(scale({ width: 800, height: 600, maxHeight: 300 })).toStrictEqual({
        width: 400,
        height: 300,
        paddingBottom: "75%",
        scale: 0.5,
      });
    });

    test("scales down the dimensions when both are passed", () => {
      expect(
        scale({
          width: 800,
          height: 600,
          maxHeight: 300,
          maxWidth: 400,
        })
      ).toStrictEqual({
        width: 400,
        height: 300,
        paddingBottom: "75%",
        scale: 0.5,
      });
    });
  });

  describe("portrait", () => {
    test("scales down the dimensions when just the maxWidth is passed", () => {
      expect(scale({ width: 600, height: 800, maxWidth: 300 })).toStrictEqual({
        width: 300,
        height: 400,
        paddingBottom: "133.33333333333331%",
        scale: 0.5,
      });
    });

    test("scales down the dimensions when just the maxHeight is passed", () => {
      expect(scale({ width: 600, height: 800, maxHeight: 300 })).toStrictEqual({
        width: 225,
        height: 300,
        paddingBottom: "133.33333333333331%",
        scale: 0.375,
      });
    });

    test("scales down the dimensions when both are passed", () => {
      expect(
        scale({
          width: 600,
          height: 800,
          maxHeight: 400,
          maxWidth: 400,
        })
      ).toStrictEqual({
        width: 300,
        height: 400,
        paddingBottom: "133.33333333333331%",
        scale: 0.5,
      });
    });
  });

  describe("square", () => {
    test("scales down the dimensions when just the maxWidth is passed", () => {
      expect(scale({ width: 600, height: 600, maxWidth: 300 })).toStrictEqual({
        width: 300,
        height: 300,
        paddingBottom: "100%",
        scale: 0.5,
      });
    });

    test("scales down the dimensions when just the maxHeight is passed", () => {
      expect(scale({ width: 600, height: 600, maxHeight: 150 })).toStrictEqual({
        width: 150,
        height: 150,
        paddingBottom: "100%",
        scale: 0.25,
      });
    });

    test("scales down the dimensions when both are passed", () => {
      expect(
        scale({
          width: 800,
          height: 800,
          maxHeight: 333,
          maxWidth: 333,
        })
      ).toStrictEqual({
        width: 333,
        height: 333,
        paddingBottom: "100%",
        scale: 0.41625,
      });
    });
  });
});
