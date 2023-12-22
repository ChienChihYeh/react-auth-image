import { useEffect, useState, forwardRef } from "react";

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
        throw new Error("The response data is not a Blob.");
      }
      return blob;
    } else {
      throw new Error("The Content-Type is not an image type.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch image. ${error.message}`);
    } else {
      throw error;
    }
  }
}

/**
 * Renders an image with authentication.
 *
 * @param {Object} props - The input props for the component.
 * @param {string} props.src - The URL of the image to be loaded.
 * @param {string} props.token - The authentication token for fetching the image.
 * @param {...React.HTMLAttributes<HTMLImageElement>} [props.restProps] - Additional HTML attributes for the image element.
 * @return {React.ReactNode} The rendered image element.
 */
export const AuthImage = forwardRef(function AuthImage(
  {
    src = "test",
    token = "test",
    ...restProps
  }: {
    src: string;
    token: string;
  } & React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    let newImageURL: string | null = null;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchImageAndSetURL = async () => {
      try {
        const blob = await fetchImage(src, token, signal);
        newImageURL = URL.createObjectURL(blob as Blob);
      } catch (error) {
        console.error(error);
      } finally {
        setImageURL(newImageURL);
      }
    };
    if (src && token) {
      fetchImageAndSetURL();
    }

    return () => {
      controller.abort();
      if (newImageURL) {
        URL.revokeObjectURL(newImageURL);
      }
    };
  }, [src, token]);

  return <img {...restProps} src={imageURL ? imageURL : src} ref={ref} />;
});

/**
 * Renders a div with a background image loaded from the given URL with authentication.
 *
 * @param {Object} props - The input props for the component.
 * @param {string} props.url - The URL of the image to be loaded as background image.
 * @param {string} props.token - The authentication token for fetching the image.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered inside the div.
 * @param {function} [props.onLoad] - The callback function to be called when the image is successfully loaded.
 * @param {function} [props.onError] - The callback function to be called if there is an error loading the image.
 * @param {Object} [props.restProps] - The additional HTML attributes for the div element.
 * @return {React.ReactNode} The div component with rendered background image.
 */
export const AuthBackgroundDiv = forwardRef(function AuthBackgroundDiv(
  {
    url,
    token,
    children,
    onLoad,
    onError,
    ...restProps
  }: {
    url: string;
    token: string;
    children?: React.ReactNode;
    onLoad?: () => void;
    onError?: () => void;
  } & React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
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
        console.error(error);
      } finally {
        setImageURL(newImageURL);
      }
    };
    if (url && token) {
      fetchImageAndSetURL();
    }

    return () => {
      controller.abort();
      if (newImageURL) {
        URL.revokeObjectURL(newImageURL);
      }
    };
  }, [url, token]);

  const { style } = { ...restProps };
  const mergedStyle = { ...style, backgroundImage: `url(${imageURL})` };

  if (url) {
    const image = new Image();
    image.src = imageURL || url;
    image.onload = () => {
      if (onLoad) {
        onLoad();
      }
    };
    image.onerror = () => {
      if (onError) {
        onError();
      }
    };
  }

  return (
    <div {...restProps} style={mergedStyle} ref={ref}>
      {children}
    </div>
  );
});
