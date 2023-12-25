import { useEffect, useState } from "react";

/**
 * Custom hook that fetches an image using provided url and token and return an object URL.
 *
 * @param {string} url - The source URL of the image.
 * @param {string} token - The authentication token for the API.
 * @param {function} errorCallback - The callback function to be called when an error occurs.
 * @return {string | null} - The URL of the fetched image, or null if the image could not be fetched.
 */
const useFetchImageAndSetURL = (
  url: string,
  token: string,
  errorCallback?: () => void
) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    let newImageURL: string | null = null;
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchImageAndSetURL = async () => {
      try {
        const blob = await fetchImage(url, token, signal);
        newImageURL = URL.createObjectURL(blob as Blob);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
          errorCallback && errorCallback();
        }
      } finally {
        setImageURL(newImageURL);
      }
    };

    if (url && token) {
      fetchImageAndSetURL();
    }

    return () => {
      if (controller) {
        controller.abort();
      }
      if (newImageURL) {
        // URL.revokeObjectURL(newImageURL);
      }
    };
  }, [url, token, errorCallback]);

  return imageURL;
};

export default useFetchImageAndSetURL;

/**
 * Fetches an image from the specified URL using the provided token and abort signal.
 *
 * @param {string} url - The URL of the image to fetch.
 * @param {string} token - The token for authentication.
 * @param {AbortSignal} signal - The abort signal to cancel the request.
 * @return {Promise<Blob|Error>} A Promise that resolves to a Blob representing the fetched image, or an Error if the request fails.
 */
async function fetchImage(
  url: string,
  token: string,
  signal: AbortSignal
): Promise<Blob | Error> {
  try {
    const response = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
      signal: signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get("Content-Type");
    const contentTypeRegex =
      /^image\/(jpeg|png|gif|bmp|webp|svg\+xml|tiff|ico)$/i;
    if (contentType && contentTypeRegex.test(contentType)) {
      const blob = await response.blob();
      if (!blob) {
        throw new Error("Cannot find blob in response.");
      }
      return blob;
    } else {
      throw new Error("The Content-Type is not an image type.");
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      throw new Error(`Failed to fetch image. ${error.message}`);
    } else {
      throw error;
    }
  }
}
