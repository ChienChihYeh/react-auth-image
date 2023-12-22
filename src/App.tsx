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
        errorCallback={() => {
          console.log("fetch error callback");
        }}
      >
        <AuthImage
          src="vite.svg"
          token="test"
          ref={imageRef}
          className="auth-image"
        />
      </AuthBackgroundDiv>
    </div>
  );
}

export default App;
