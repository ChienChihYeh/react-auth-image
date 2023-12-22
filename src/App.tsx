import "./App.css";
import { AuthImage } from "./components";
import { AuthBackgroundDiv } from "./components";
import { useRef } from "react";

function App() {
  const imageRef = useRef(null);
  const divRef = useRef(null);

  return (
    <div>
      <AuthBackgroundDiv
        url="vite.svg"
        token="test"
        style={{ backgroundSize: "cover", width: "80px", height: "80px" }}
        className="auth-background"
        ref={divRef}
        onError={() => {
          console.log("background image fetch error");
        }}
      >
        <AuthImage
          src="vite.svg"
          token="test"
          ref={imageRef}
          className="auth-image"
        />
      </AuthBackgroundDiv>
      <AuthBackgroundDiv
        url="xxx"
        token="test"
        style={{
          backgroundSize: "cover",
          width: "30px",
          height: "30px",
          margin: "auto",
        }}
        onError={() => {
          console.log("background image fetch error");
        }}
      />
    </div>
  );
}

export default App;
