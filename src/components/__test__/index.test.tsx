/**
 * @vitest-environment jsdom
 */
import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import { AuthImage, AuthBackgroundDiv } from "..";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();

  vi.spyOn(window.URL, "createObjectURL").mockImplementation(
    () => "http://mock.url"
  );
});

describe("AuthImage", () => {
  it("should fetch and render image with an image element", async () => {
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
          token="bad-token"
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

  it("should pass down HTML img element attributes", async () => {
    const clickHandler = vi.fn();

    await act(async () => {
      render(
        <AuthImage
          src="http://api.example.com/test.svg"
          token="test"
          onClick={() => {
            clickHandler();
          }}
          title="test"
        />
      );
    });
    const element = document.querySelector("img")!;
    fireEvent.click(element);
    expect(element.getAttribute("title")).toBe("test");
    expect(clickHandler).toBeCalled();
  });

  it("should render an image element correctly with forward ref", async () => {
    const ref = React.createRef<HTMLImageElement>();

    await act(async () => {
      render(
        <AuthImage
          src="http://api.example.com/test.svg"
          token="test"
          id="test"
          data-testid="auth-image"
          ref={ref}
        />
      );
    });
    const element = screen.getByTestId("auth-image");
    expect(ref.current).toBe(element);
  });
});

describe("AuthBackgroundDiv", () => {
  it("should fetch and render the image as the background of a div element", async () => {
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
          token="bad-token"
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

  it("should pass down HTML div element attributes", async () => {
    const clickHandler = vi.fn();

    await act(async () => {
      render(
        <AuthBackgroundDiv
          url="http://api.example.com/test.svg"
          token="test"
          onClick={() => {
            clickHandler();
          }}
          title="test"
          data-testid="auth-background-div"
        />
      );
    });
    const element = screen.getByTestId("auth-background-div");
    fireEvent.click(element);
    expect(clickHandler).toBeCalled();
    expect(element.getAttribute("title")).toBe("test");
  });

  it("should render a div element correctly with forward ref", async () => {
    const ref = React.createRef<HTMLDivElement>();

    await act(async () => {
      render(
        <AuthBackgroundDiv
          url="http://api.example.com/test.svg"
          token="test"
          id="test"
          data-testid="auth-background-div"
          ref={ref}
        />
      );
    });
    const element = screen.getByTestId("auth-background-div");
    expect(ref.current).toBe(element);
  });
});
