export function AuthImage({
  url,
  token,
  ...restProps
}: { url: string; token: string } & React.HTMLAttributes<HTMLImageElement>) {
  console.log(url, token);
  return <img {...restProps} />;
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
  console.log(url, token);
  return <div {...restProps}>{children}</div>;
}
