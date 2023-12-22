import { http, HttpHandler, HttpResponse } from "msw";

export const handlers: HttpHandler[] = [
  http.get("http://api.example.com/test.svg", async ({ request }) => {
    if (request.headers.get("Authorization") !== "Bearer test") {
      return HttpResponse.error();
    }

    const mockSvgData =
      '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>';

    const blob = new Blob([mockSvgData], { type: "image/svg+xml" });

    return new HttpResponse(blob, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }),
  http.get("http://api.example.com/user", ({ request }) => {
    if (request.headers.get("Authorization") !== "Bearer test") {
      return HttpResponse.error();
    }

    return HttpResponse.json({
      firstName: "John",
      lastName: "Doe",
    });
  }),
];
