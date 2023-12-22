/**
 * @vitest-environment jsdom
 */
// import useFetchImageAndSetURL from "../usFetchImageAndSetURL";

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
  () => "http://mock.url"
);

describe("useFetchImageAndSetURL", () => {
  //TODO: custom hoook test
});
