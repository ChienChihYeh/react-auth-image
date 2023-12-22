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
 * Custom hook that fetches an image using provided url and token and return an object URL.
 *
 * @param {string} url - The source URL of the image.
 * @param {string} token - The authentication token for the API.
 * @return {string | null} - The URL of the fetched image, or null if the image could not be fetched.
 */
const useFetchImageAndSetURL = (url: string, token: string) => {
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
      if (controller) {
        controller.abort();
      }
      if (newImageURL) {
        URL.revokeObjectURL(newImageURL);
      }
    };
  }, [url, token]);

  return imageURL;
};

type ImageEventProps = {
  url: string;
  imageURL: string | null;
  onError?: () => void;
  onLoad?: () => void;
};

/**
 * Generates a mock image event for the given URL or imageURL.
 *
 * @param {ImageEventProps} params - The parameters for the mock image event.
 * @param {string} params.url - The URL of the image.
 * @param {string} params.imageURL - The URL of the image to be loaded.
 * @param {function} params.onError - A callback function to be executed when an error occurs during image loading.
 * @param {function} params.onLoad - A callback function to be executed when the image is successfully loaded.
 */
const mockImageEvent = ({
  url,
  imageURL,
  onError,
  onLoad,
}: ImageEventProps) => {
  if (!url) return;
  const image = new Image();
  image.src = imageURL || url;
  image.onload = () => {
    onLoad && onLoad();
  };
  image.onerror = () => {
    onError && onError();
  };
};

type AuthImageProps = {
  src: string;
  token: string;
} & React.HTMLAttributes<HTMLDivElement>;

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
  { src, token, ...restProps }: AuthImageProps,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  const imageURL = useFetchImageAndSetURL(src, token);

  return <img {...restProps} src={imageURL ? imageURL : src} ref={ref} />;
});

type AuthBackgroundDivProps = {
  url: string;
  token: string;
  children?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders a div with a background image loaded from the given URL with authentication.
 *
 * @param {Object} props - The input props for the component.
 * @param {string} props.url - The URL of the image to be loaded as background image.
 * @param {string} props.token - The authentication token for fetching the image.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered inside the div.
 * @param {function} [props.onLoad] - The callback function to be called mocking successfully loading image for image element.
 * @param {function} [props.onError] - The callback function to be called mocking error when loading the image for image element.
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
  }: AuthBackgroundDivProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const imageURL = useFetchImageAndSetURL(url, token);
  const { style } = { ...restProps };
  const mergedStyle = { ...style, backgroundImage: `url(${imageURL})` };

  mockImageEvent({ url, imageURL, onLoad, onError });

  return (
    <div {...restProps} style={mergedStyle} ref={ref}>
      {children}
    </div>
  );
});
