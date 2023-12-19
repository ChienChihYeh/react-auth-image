import { useEffect, useState } from "react";

export function AuthImage({
  url,
  token,
  ...restProps
}: { url: string; token: string } & React.HTMLAttributes<HTMLImageElement>) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!url || !token) {
          throw new Error("Missing url or token");
        }
        const response = await fetch(url, {
          headers: { Authorization: "Bearer " + token },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();

        if (!blob || !(blob instanceof Blob)) {
          throw new Error("Invalid data format");
        }
        const newImageURL = URL.createObjectURL(blob);
        setImageURL(newImageURL);
      } catch (err) {
        console.log(err);
        setImageURL(null);
      }
    };

    fetchImage();

    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [url, token]);

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
  chilren?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!url || !token) {
          throw new Error("Missing url or token");
        }
        const response = await fetch(url, {
          headers: { Authorization: "Bearer " + token },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();

        if (!blob || !(blob instanceof Blob)) {
          throw new Error("Invalid data format");
        }
        const newImageURL = URL.createObjectURL(blob);
        setImageURL(newImageURL);
      } catch (err) {
        console.log(err);
        setImageURL(null);
      }
    };

    fetchImage();

    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
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
