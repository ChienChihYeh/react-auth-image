/**
 * @vitest-environment jsdom
 */
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { AuthImage } from "..";

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
  () => "http://fake.url"
);

describe("AuthImage", () => {
  it("fetch image and render", async () => {
    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(
        <AuthImage src="http://api.example.com/test.svg" token="test" />
      );
    });

    const tree = component!.toTree() as ReactTestRendererJSON;
    console.log(tree);
    expect(tree.props.src).toBe("http://fake.url");
  });
});

// describe("AuthBackgroundDiv", () => {
//   it("renders <div></div>", () => {
//     const component = renderer.create(<AuthBackgroundDiv url="" token="" />);

//     const tree = component.toJSON() as ReactTestRendererJSON;
//     expect(tree.type).toBe("div");
//   });
// });
