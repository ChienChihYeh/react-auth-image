/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import useFetchImageAndSetURL from "../usFetchImageAndSetURL";

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
  () => "http://mock.url"
);

// const imageURL = useFetchImageAndSetURL(src, token, errorCallback);
describe("useFetchImageAndSetURL", () => {
  it("get normal imageURL", async () => {
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
    expect(result!.current).toBe('http://mock.url');
  });

  it("errorCallback should be called", async () => {
    const errorCallback = vi.fn();
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
});
