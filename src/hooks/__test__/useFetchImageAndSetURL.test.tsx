/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import useFetchImageAndSetURL from "../useFetchImageAndSetURL";
import { Mock } from "vitest";

const errorCallback = vi.fn();
const revoke = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();

  vi.spyOn(window.URL, "createObjectURL").mockImplementation(
    () => "http://mock.url"
  );
  vi.spyOn(window.URL, "revokeObjectURL").mockImplementation(revoke);
});

// const imageURL = useFetchImageAndSetURL(src, token, errorCallback);
describe("useFetchImageAndSetURL", () => {
  it("should create object URL upon successful image fetching", async () => {
    const errorCallback = () => {
      console.log("errorCallback called");
    };
    let result;
    await act(async () => {
      ({ result } = renderHook(() =>
        useFetchImageAndSetURL(
          "http://api.example.com/test.svg",
          "test",
          errorCallback
        )
      ));
    });
    console.log({ result });
    expect(result!.current).toBe("http://mock.url");
  });

  it("should return null if image url is an empty string", async () => {
    let result;
    await act(async () => {
      ({ result } = renderHook(() => useFetchImageAndSetURL("", "test")));
    });
    console.log({ result });
    expect(result!.current).toBe(null);
  });

  it("should call errorCallback upon encountering an error during image fetching", async () => {
    let result;
    await act(async () => {
      ({ result } = renderHook(() =>
        useFetchImageAndSetURL(
          "http://api.example.com/test.svg",
          "bad-token",
          errorCallback
        )
      ));
    });
    console.log({ result });
    expect(errorCallback).toBeCalled();
  });

  it("should revoke object URL upon changing image url", async () => {
    let result;
    let rerender: (arg0: {
      url: string;
      token: string;
      errorCallback: Mock;
    }) => void;

    await act(async () => {
      ({ result, rerender } = renderHook(
        ({ url, token, errorCallback }) =>
          useFetchImageAndSetURL(url, token, errorCallback),
        {
          initialProps: {
            url: "http://api.example.com/test.svg",
            token: "test",
            errorCallback: errorCallback,
          },
        }
      ));
    });
    console.log({ result });
    await act(async () => {
      rerender({
        url: "http://api.example.com/user",
        token: "test",
        errorCallback: errorCallback,
      });
    });
    console.log({ result });
    expect(revoke).toHaveBeenCalled();
  });
});
