import "./App.css";
import { AuthImage } from "./components";
import { AuthBackgroundImage } from "./components";

function App() {
  return (
    <div>
      <AuthBackgroundImage
        url="/vite.svg"
        token="test"
        style={{ backgroundSize: "cover", width: "80px", height: "80px" }}
      >
        <AuthImage url="/vite.svg" token="test" />
      </AuthBackgroundImage>
    </div>
  );
}

export default App;
