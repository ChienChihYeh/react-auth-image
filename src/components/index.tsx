import { forwardRef } from "react";
import useFetchImageAndSetURL from "../hooks/useFetchImageAndSetURL";

type AuthImageProps = {
  src: string;
  token: string;
  errorCallback?: (error: Error) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders an image with authentication.
 *
 * @param {Object} props - The input props for the component.
 * @param {string} props.src - The URL of the image to be loaded.
 * @param {string} props.token - The authentication token for fetching the image.
 * @param {function} props.errorCallback - The callback function to be called when an error occurs.
 * @param {...React.HTMLAttributes<HTMLImageElement>} [props.restProps] - Additional HTML attributes for the image element.
 * @return {React.ReactNode} The rendered image element.
 */
export const AuthImage = forwardRef(function AuthImage(
  { src, token, errorCallback, ...restProps }: AuthImageProps,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  const imageURL = useFetchImageAndSetURL(src, token, errorCallback);

  return <img {...restProps} src={imageURL ? imageURL : src} ref={ref} />;
});

type AuthBackgroundDivProps = {
  url: string;
  token: string;
  errorCallback?: (error: Error) => void;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders a div with a background image loaded from the given URL with authentication.
 *
 * @param {Object} props - The input props for the component.
 * @param {string} props.url - The URL of the image to be loaded as background image.
 * @param {string} props.token - The authentication token for fetching the image.
 * @param {function} props.errorCallback - The callback function to be called when an error occurs.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered inside the div.
 * @param {Object} [props.restProps] - The additional HTML attributes for the div element.
 * @return {React.ReactNode} The div component with rendered background image.
 */
export const AuthBackgroundDiv = forwardRef(function AuthBackgroundDiv(
  { url, token, errorCallback, children, ...restProps }: AuthBackgroundDivProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const imageURL = useFetchImageAndSetURL(url, token, errorCallback);
  const { style } = { ...restProps };
  const mergedStyle = { ...style, backgroundImage: `url(${imageURL})` };
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

  return (
    <div {...restProps} style={mergedStyle} ref={ref}>
      {children}
    </div>
  );
});
