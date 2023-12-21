import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { AuthImage, AuthBackgroundDiv } from "..";

describe("AuthImage", () => {
  it("AuthImage component renders <img/>", () => {
    const component = renderer.create(<AuthImage src="" token="" />);

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe("img");
  });
});

describe("AuthBackgroundDiv", () => {
  it("AuthBackgrounImage component renders <div></div>", () => {
    const component = renderer.create(<AuthBackgroundDiv url="" token="" />);

    const tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree.type).toBe("div");
  });
});
