import { useEffect, useState } from "react";

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
    const blob = await response.blob();
    return blob;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch image. ${error.message}`);
    } else {
      throw error;
    }
  }
}

export function AuthImage({
  src = "test",
  token = "test",
  ...restProps
}: { src: string; token: string } & React.HTMLAttributes<HTMLImageElement>) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    let newImageURL: string | null = null;
    const controller = new AbortController();
    const signal = controller.signal;

    if (src && token) {
      fetchImage(src, token, signal)
        .then((blob) => {
          if (blob instanceof Blob) {
            newImageURL = URL.createObjectURL(blob);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setImageURL(newImageURL);
        });
    }

    return () => {
      controller.abort();
      if (newImageURL) {
        URL.revokeObjectURL(newImageURL);
      }
    };
  }, [src, token]);

  return <img {...restProps} src={imageURL ? imageURL : undefined} />;
}

export function AuthBackgroundImage({
  url,
  token,
  children,
  ...restProps
}: {
  url: string;
  token: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    let newImageURL: string | null = null;
    const controller = new AbortController();
    const signal = controller.signal;
    if (url && token) {
      fetchImage(url, token, signal)
        .then((blob) => {
          if (blob instanceof Blob) {
            newImageURL = URL.createObjectURL(blob);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setImageURL(newImageURL);
        });
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

  return (
    <div {...restProps} style={mergedStyle}>
      {children}
    </div>
  );
}
