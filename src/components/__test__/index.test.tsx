import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { AuthImage, AuthBackgroundImage } from "..";

describe("AuthImage", () => {
  it("AuthImage component renders <img/>", () => {
    const component = renderer.create(<AuthImage url="" token="" />);

    const tree = component.toJSON() as ReactTestRendererJSON;

    expect(tree.type).toBe("img");
    expect(tree.children).toBe(null);
  });
});

describe("AuthBackgroundImage", () => {
  it("AuthBackgrounImage component renders <div></div>", () => {
    const component = renderer.create(<AuthBackgroundImage url="" token="" />);

    const tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree.type).toBe("div");
  });
});
