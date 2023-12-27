# react-auth-image

React components for rendering images from protected URLs using an authorization bearer token.

## Installation

```bash
npm install react-auth-image
```

## Usage

#### Render image using `img` element

1. Import the AuthImage component:

```javascript
import { AuthImage } from "react-auth-image";
```

2. Provide the following props to the `AuthImage` component:

```javascript
<AuthImage
  src={url}
  token={token}
  errorCallback={handleError}
  {...HTMLImageElementAttributes}
/>
```

#### `AuthImage` Props

| Prop             | Type       | Description                                                                                                                             |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `src`            | `string`   | (Required) The source URL for the image.                                                                                                |
| `token`          | `string`   | (Required) The authentication token for accessing the image. This token will be added to the Authorization header as `Bearer ${token}`. |
| `errorCallback`  | `function` | An optional callback function to handle errors when accessing the image.                                                                |
| Other Attributes | -          | Any additional HTML image element attributes can be passed as props.                                                                    |

#### Render image using `div` element background

1. Import the `AuthBackgroundDiv` component:

```javascript
import { AuthBackgroundDiv } from "react-auth-image";
```

2. Provide the following props to the `AuthBackgroundDiv` component:

```javascript
<AuthBackgroundDiv
  url={url}
  token={token}
  errorCallback={handleError}
  {...HTMLImageElementAttributes}
>
  {/* Children can be added here */}
  <p>This is a child</p>
</AuthBackgroundDiv>
```

#### `AuthBackgroundDiv` Props

| Prop             | Type       | Description                                                                                                                             |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `url`            | `string`   | (Required) The source URL for the image.                                                                                                |
| `token`          | `string`   | (Required) The authentication token for accessing the image. This token will be added to the Authorization header as `Bearer ${token}`. |
| `errorCallback`  | `function` | An optional callback function to handle errors when accessing the image.                                                                |
| Other Attributes | -          | Any additional HTML div element attributes can be passed as props.                                                                      |

## Example

#### Render image using `AuthImage`:

```javascript
import { AuthImage } from "react-auth-image";

const MyComponent = () => {
  const url = "https://example.com/image.jpg";
  const token = "your-auth-token";

  const handleError = (error) => {
    console.error(`Error rendering image: ${error.message}`);
  };

  return (
    <AuthImage
      src={url}
      token={token}
      errorCallback={handleError}
      alt="example-image"
      className="my-image"
    />
  );
};
```

#### Render image using `AuthBackgroundDiv`:

```javascript
import { AuthBackgroundDiv } from "react-auth-image";

const MyComponent = () => {
  const url = "https://example.com/image.jpg";
  const token = "your-auth-token";

  const handleError = (error) => {
    console.error(`Error rendering image: ${error.message}`);
  };

  return (
    <AuthBackgroundDiv
      url={url}
      token={token}
      errorCallback={handleError}
      className="my-div"
    >
      <p>This is a child</p>
    </AuthBackgroundDiv>
  );
};
```

## Contributors

<!-- CONTRIBUTORS_LIST_START -->

[@ChienChihYeh](https://github.com/ChienChihYeh)
[@shinder](https://github.com/shinder)

<!-- CONTRIBUTORS_LIST_END -->
