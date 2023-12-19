import "./App.css";
import { AuthImage } from "./components";
import { AuthBackgroundImage } from "./components";

function App() {
  return (
    <div>
      <AuthBackgroundImage url="" token="">
        <AuthImage url="" token="" />
      </AuthBackgroundImage>
    </div>
  );
}

export default App;
