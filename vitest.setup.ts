import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/mocks/node.js";

window.URL.createObjectURL = vi.fn();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
