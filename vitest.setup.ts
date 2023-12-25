import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/mocks/node.js";

window.URL.createObjectURL = vi.fn();
window.URL.revokeObjectURL = vi.fn();

globalThis.URL = URL;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
