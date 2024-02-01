import "./App.css";
import { AuthImage } from "./components";
import { AuthBackgroundDiv } from "./components";
import { useRef, useState } from "react";

function App() {
  const imageRef = useRef(null);
  const divRef = useRef(null);
  const [isDisplay, setIsDisplay] = useState(true);

  return (
    <div>
      <AuthBackgroundDiv
        url={isDisplay ? "vite.svg" : ""}
        // url="vite.svg"
        // token="test"
        token={isDisplay ? "test" : ""}
        style={{
          backgroundSize: "cover",
          width: "80px",
          height: "80px",
          margin: "auto",
        }}
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
      <button
        style={{ marginTop: "10px", backgroundColor: "#ccc" }}
        onClick={() => {
          setIsDisplay((prev) => !prev);
        }}
      >
        Toggle
      </button>
    </div>
  );
}

export default App;
