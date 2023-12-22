/**
 * @vitest-environment jsdom
 */
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { AuthImage, AuthBackgroundDiv } from "..";

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
  () => "http://mock.url"
);

describe("AuthImage", () => {
  it("should fetch and render image in image element", async () => {
    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(
        <AuthImage src="http://api.example.com/test.svg" token="test" />
      );
    });

    const tree = component!.toTree() as ReactTestRendererJSON;
    expect(tree.type).toBe("img");
    expect(tree.props.src).toBe("http://mock.url");
  });

  it("should call errorCallback on authorization error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthImage
          src="http://api.example.com/test.svg"
          token="error-token"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  it("should call errorCallback on content-type error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthImage
          src="http://api.example.com/user"
          token="test"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  it("should call errorCallback on fetch URL error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthImage
          src="http://api.example.com/error"
          token="test"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  //TODO: interaction test
});

describe("AuthBackgroundDiv", () => {
  it("should fetch and render image in div background", async () => {
    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(
        <AuthBackgroundDiv url="http://api.example.com/test.svg" token="test" />
      );
    });
    const tree = component!.toJSON() as ReactTestRendererJSON;
    expect(tree.type).toBe("div");
    expect(tree.props.style.backgroundImage).toBe("url(http://mock.url)");
  });

  it("should call errorCallback on authorization error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthBackgroundDiv
          url="http://api.example.com/test.svg"
          token="error-token"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  it("should call errorCallback on content-type error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthBackgroundDiv
          url="http://api.example.com/user"
          token="test"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  it("should call errorCallback on fetch URL error", async () => {
    const callback = vi.fn();
    await act(async () => {
      renderer.create(
        <AuthBackgroundDiv
          url="http://api.example.com/error"
          token="test"
          errorCallback={callback}
        />
      );
    });
    expect(callback).toBeCalled();
  });

  //TODO: interaction test
});
