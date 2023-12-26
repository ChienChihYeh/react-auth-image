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
        url="vite.sv"
        token="test"
        style={{ backgroundSize: "cover", width: "80px", height: "80px" }}
        className="auth-background"
        ref={divRef}
        errorCallback={(e) => {
          console.error(`Error rendering image: ${e.message}`);
        }}
      >
        <AuthImage
          src="vite.svg"
          token="test"
          ref={imageRef}
          className="auth-image"
          errorCallback={(e) => {
            console.error(e);
          }}
        />
      </AuthBackgroundDiv>
    </div>
  );
}

export default App;
