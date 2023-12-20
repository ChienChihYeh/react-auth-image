import "./App.css";
import { AuthImage } from "./components";
import { AuthBackgroundDiv } from "./components";

function App() {
  return (
    <div>
      <AuthBackgroundDiv
        url="/vite.svg"
        token="test"
        style={{ backgroundSize: "cover", width: "80px", height: "80px" }}
      >
        <AuthImage src="/vite.svg" token="test" />
      </AuthBackgroundDiv>
    </div>
  );
}

export default App;
